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
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}
