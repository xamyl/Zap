import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    title: "Connect Anything",
    desc: "Supports 7,000+ apps and lets you link them effortlessly with triggers and actions.",
  },
  {
    title: "Custom Code Blocks",
    desc: "Run Python, JS, or Bash inline in any automation. Fully sandboxed.",
  },
  {
    title: "Build Custom Integrations",
    desc: "Use ZapForge to build and publish your own app actions from OpenAPI schemas.",
  },
  {
    title: "Lightning Fast",
    desc: "Build it. Deploy it. Run it. All in seconds. No more waiting for your automations to deploy.",
  },
  {
    title: "Flowchart Builder",
    desc: "Create and visualize automations with a beautiful drag-and-drop interface.",
  },
  {
    title: "Self-Hosted Runners",
    desc: "Run workflows privately or on the edge with Zap Docker or Cloudflare Workers.",
  },
  {
    title: "Built-in Secrets Management",
    desc: "Store and manage secrets securely with built-in secrets management.",
  },
  {
    title: "Open Source",
    desc: "Fully open-sourced and self-hostable. No vendor lock-in. You own your data. Unlike literally every publicly-traded company ever. (Except Supabase. We love Supabase.)",
  },
  {
    title: "Community Driven",
    desc: "Join a vibrant community of developers and users. Contribute to the project and help shape its future.",
  },
  {
    title: "100% Free",
    desc: "No hidden fees, no premium features. Just a powerful automation platform for everyone. Please consider donating to support the project.",
  },
  {
    title: "Multi-User Support",
    desc: "Easily manage multiple users and teams with role-based access control.",
  },
  {
    title: "Multi-Region Support",
    desc: "Deploy your automations in multiple regions, Thanks to Cloudflare. 💛",
  },
]

export default function MainFeatures() {
  return (
    <section className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="bg-gray-800 border border-yellow-500/20 shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">{feat.title}</h3>
            <p className="text-sm text-gray-300">{feat.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
