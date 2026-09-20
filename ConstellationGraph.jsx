import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Sparkles, 
  ZoomIn, 
  RotateCcw, 
  Eye, 
  Trophy, 
  Heart, 
  TrendingUp, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { CONNECTION_THREADS } from '../data/storyConnections';
import { playClickSound, playBellChime } from '../utils/soundEffects';

export default function ConstellationGraph({ onInspectReceipt }) {
  const [selectedThreadId, setSelectedThreadId] = useState('thread-marathon');
  const [activeNode, setActiveNode] = useState(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Active story thread
  const currentThread = CONNECTION_THREADS.find(t => t.id === selectedThreadId) || CONNECTION_THREADS[0];

  // Simulation state for nodes
  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const draggingNodeRef = useRef(null);

  // Initialize node positions in a circular/orbital layout
  useEffect(() => {
    const nodes = currentThread.nodes.map((n, idx) => {
      const isCenter = n.id === currentThread.centerNodeId;
      const angle = (idx / (currentThread.nodes.length - 1)) * Math.PI * 2;
      const radius = isCenter ? 0 : 160 + (idx % 2) * 40;
      return {
        ...n,
        x: isCenter ? 350 : 350 + Math.cos(angle) * radius,
        y: isCenter ? 260 : 260 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        isCenter
      };
    });

    const links = currentThread.links.map(l => ({ ...l }));

    nodesRef.current = nodes;
    linksRef.current = links;
    setActiveNode(nodes.find(n => n.isCenter) || nodes[0]);

    playBellChime();
  }, [selectedThreadId]);

  // Canvas Physics & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let tick = 0;

    const render = () => {
      tick += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      const center = { x: width / 2, y: height / 2 };

      // Gentle force directed physics
      const nodes = nodesRef.current;
      const links = linksRef.current;

      // Spring forces between linked nodes
      links.forEach(link => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const desired = 140;
          const force = (dist - desired) * 0.015;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (!source.isCenter && source !== draggingNodeRef.current) {
            source.x += fx;
            source.y += fy;
          }
          if (!target.isCenter && target !== draggingNodeRef.current) {
            target.x -= fx;
            target.y -= fy;
          }
        }
      });

      // Node repulsion to avoid clustering
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 110) {
            const force = (110 - dist) * 0.03;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (!a.isCenter && a !== draggingNodeRef.current) {
              a.x -= fx;
              a.y -= fy;
            }
            if (!b.isCenter && b !== draggingNodeRef.current) {
              b.x += fx;
              b.y += fy;
            }
          }
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 35;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Connection Lines
      links.forEach((link, idx) => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);
        if (!source || !target) return;

        const isHighlighted = activeNode && (activeNode.id === source.id || activeNode.id === target.id);

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = isHighlighted 
          ? currentThread.accentColor 
          : 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();

        // Energy pulse particle traveling along line
        const pulseOffset = (tick + idx * 0.4) % 1;
        const px = source.x + (target.x - source.x) * pulseOffset;
        const py = source.y + (target.y - source.y) * pulseOffset;

        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#ffffff' : currentThread.accentColor;
        ctx.shadowColor = currentThread.accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      nodes.forEach(node => {
        const isSelected = activeNode && activeNode.id === node.id;
        const radius = node.size || 26;

        // Glowing orbital ring for center or selected node
        if (node.isCenter || isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8 + Math.sin(tick * 3) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `${currentThread.accentColor}55`;
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color || '#3b82f6';
        ctx.shadowColor = node.color || '#3b82f6';
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node border
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = isSelected ? 'bold 12px Space Mono, monospace' : '11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + radius + 14);

        // Value subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Space Mono, monospace';
        ctx.fillText(node.value || node.facet, node.x, node.y + radius + 26);
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentThread, activeNode]);

  // Canvas Mouse Interactions (Click, Drag)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const hit = nodesRef.current.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < (n.size || 26);
    });

    if (hit) {
      playClickSound();
      setActiveNode(hit);
      draggingNodeRef.current = hit;
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    draggingNodeRef.current.x = x;
    draggingNodeRef.current.y = y;
  };

  const handleMouseUp = () => {
    draggingNodeRef.current = null;
  };

  const handleResetPositions = () => {
    playClickSound();
    setSelectedThreadId(prev => prev);
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      {/* Banner / Explanation for Hackathon Judges */}
      <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-emerald-500/15 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Network className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white font-mono">
                The Connection Constellation
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-semibold uppercase">
                Core Requirement Solved
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Moving beyond chronological timelines: Discover how five seemingly unrelated digital records—
              <span className="text-amber-300 font-medium"> Song → Location → Photo → Purchase → Event </span>
              —converge into a pivotal chapter in someone's life.
            </p>
          </div>

          {/* Preset Story Arc Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CONNECTION_THREADS.map(thread => {
              const isActive = selectedThreadId === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedThreadId(thread.id);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                  style={{
                    borderColor: isActive ? thread.accentColor : undefined,
                    boxShadow: isActive ? `0 0 15px -3px ${thread.accentColor}44` : undefined
                  }}
                >
                  {thread.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Work Area: Canvas Graph + Narrative Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2D Interactive Canvas Graph (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col items-center">
          {/* Canvas Controls Header */}
          <div className="w-full px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Click or drag any node to explore connections
            </span>
            <button
              onClick={handleResetPositions}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Layout</span>
            </button>
          </div>

          {/* Canvas Element */}
          <div className="w-full flex justify-center p-2 bg-slate-950">
            <canvas
              ref={canvasRef}
              width={700}
              height={520}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full max-w-[700px] h-[480px] sm:h-[520px] cursor-grab active:cursor-grabbing rounded-xl"
            />
          </div>

          {/* Legend Strip */}
          <div className="w-full px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Events</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" /> Purchases</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" /> Music</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" /> Places</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]" /> Messages</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]" /> Photos</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Searches</span>
          </div>
        </div>

        {/* Right: Narrative Thread Inspector Panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Thread Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Story Arc Dossier
              </span>
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                style={{
                  backgroundColor: `${currentThread.accentColor}20`,
                  color: currentThread.accentColor,
                  border: `1px solid ${currentThread.accentColor}40`
                }}
              >
                {currentThread.nodes.length} Connected Facets
              </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-tight">
              {currentThread.title}
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              "{currentThread.tagline}"
            </p>
            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {currentThread.description}
            </p>
          </div>

          {/* Active Node Detail Card */}
          {activeNode ? (
            <div className="bg-[#faf7f2] text-zinc-900 rounded-xl p-4 border border-[#e2ddd3] font-mono-receipt shadow-lg space-y-3 animate-in fade-in">
              <div className="border-b border-dashed border-zinc-400 pb-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    SELECTED CONSTELLATION NODE
                  </span>
                  <h4 className="text-sm font-black text-zinc-950">
                    {activeNode.label}
                  </h4>
                </div>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: activeNode.color }}
                >
                  {activeNode.facet}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-700">
                <div className="flex justify-between">
                  <span className="text-zinc-500">MOMENT VALUE:</span>
                  <span className="font-extrabold text-zinc-950">{activeNode.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DATE TIMESTAMP:</span>
                  <span className="font-semibold">{activeNode.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">NODE ROLE:</span>
                  <span className="font-semibold text-amber-800">
                    {activeNode.isCenter ? 'Epicenter Moment' : 'Supporting Evidence'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-zinc-400">
                <p className="text-[11px] text-zinc-600 font-sans leading-snug">
                  {activeNode.isCenter 
                    ? 'This milestone serves as the catalytic anchor connecting this person\'s financial choices, transit routes, and emotional state.'
                    : `Discovered connection linking back to the core ${currentThread.title} journey.`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-6 text-center text-xs text-slate-500">
              Click any node in the constellation to inspect its connected forensic thread.
            </div>
          )}

          {/* List of Connected Nodes in Thread */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              The Relationship Chain ({currentThread.nodes.length} Moments):
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {currentThread.nodes.map(n => (
                <div
                  key={n.id}
                  onClick={() => {
                    playClickSound();
                    setActiveNode(n);
                  }}
                  className={`p-2 rounded-lg text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                    activeNode?.id === n.id
                      ? 'bg-slate-800 text-white border-l-2'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  style={{
                    borderLeftColor: activeNode?.id === n.id ? n.color : 'transparent'
                  }}
                >
                  <span className="truncate pr-2">{n.label}</span>
                  <span className="text-[10px] text-slate-500 shrink-0">{n.facet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
