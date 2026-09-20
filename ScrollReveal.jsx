import { motion } from "framer-motion";

/**
 * ScrollReveal
 * Wrap any block of content to have it fade+slide in once as it enters view.
 * Use `index` to stagger a list of these (index * 0.08s delay each).
 *
 * Usage:
 *   <ScrollReveal index={0}><ReceiptCard ... /></ScrollReveal>
 *   <ScrollReveal index={1}><ReceiptCard ... /></ScrollReveal>
 */
export default function ScrollReveal({ children, index = 0, className = "" }) {
  return (
    <motion.div
      className={`scroll-reveal ${className}`.trim()}
      initial={{ opacity: 0, y: 70, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.06, 0.42) }}
    >
      {children}
    </motion.div>
  );
}
