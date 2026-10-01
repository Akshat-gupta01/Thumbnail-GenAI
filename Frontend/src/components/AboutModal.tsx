import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XIcon, SparklesIcon, CpuIcon, LayersIcon, EyeIcon } from "lucide-react";
import { dummyThumbnails } from "../assets/assets";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
    // Escape key listener to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div 
                        className="relative w-full max-w-4xl bg-slate-950/95 border border-pink-950/60 p-6 md:p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[85vh] z-10 scrollbar-thin scrollbar-thumb-pink-600/30"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Glow effects */}
                        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Close Button */}
                        <button 
                            type="button"
                            onClick={onClose} 
                            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <XIcon size={18} />
                        </button>

                        {/* Modal Content */}
                        <div className="space-y-8">
                            {/* Header */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-semibold mb-3">
                                    <SparklesIcon size={12} className="animate-pulse" />
                                    <span>AI Thumbnail Generator</span>
                                </div>
                                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-transparent">
                                    About Thumbnail-Gen
                                </h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                                    An advanced, AI-powered platform designed to generate high-performance video thumbnails. Boost your Click-Through Rate (CTR) with professional design styles, custom color harmonies, and clean text overlays powered by state-of-the-art AI.
                                </p>
                            </div>

                            {/* Info Blocks Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl border border-slate-900 bg-white/3 space-y-2 hover:border-pink-900/30 transition-all duration-300">
                                    <div className="size-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                        <CpuIcon size={18} />
                                    </div>
                                    <h3 className="font-bold text-white text-sm">State-of-the-Art AI</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Powered by NVIDIA's API integration with **Black Forest Labs Flux.1-dev**, providing ultra-crisp, high-fidelity image generations.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl border border-slate-900 bg-white/3 space-y-2 hover:border-pink-900/30 transition-all duration-300">
                                    <div className="size-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                        <LayersIcon size={18} />
                                    </div>
                                    <h3 className="font-bold text-white text-sm">Design Presets</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Select from curated aspect ratios, custom color schemes, and 5 distinct artistic styles: Bold, Minimalist, Illustrated, Tech, or Photorealistic.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl border border-slate-900 bg-white/3 space-y-2 hover:border-pink-900/30 transition-all duration-300">
                                    <div className="size-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                        <EyeIcon size={18} />
                                    </div>
                                    <h3 className="font-bold text-white text-sm">Legible Typography Overlays</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Supports automatic embedding of the video title directly onto the thumbnail image in clean, bold, highly legible text overlays.
                                    </p>
                                </div>
                            </div>

                            {/* Tech Stack section */}
                            <div className="p-6 rounded-xl border border-slate-900 bg-gradient-to-br from-slate-950 to-pink-950/10">
                                <h3 className="text-sm font-bold text-white mb-3">Project Architecture & Technologies</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Frontend</p>
                                        <p className="text-xs font-semibold text-white mt-1">React + Vite</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Styling</p>
                                        <p className="text-xs font-semibold text-white mt-1">Tailwind CSS</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Backend API</p>
                                        <p className="text-xs font-semibold text-white mt-1">Node.js + Express</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Database & Media</p>
                                        <p className="text-xs font-semibold text-white mt-1">MongoDB + Cloudinary</p>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">Sample Project Galleries</h3>
                                    <span className="text-[11px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">Interactive Showcase</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {dummyThumbnails.slice(0, 6).map((item) => (
                                        <motion.div 
                                            key={item._id}
                                            className="group relative rounded-xl overflow-hidden border border-slate-900 bg-slate-950 flex flex-col hover:border-pink-500/30 transition-all duration-300"
                                            whileHover={{ y: -4 }}
                                        >
                                            <div className="relative aspect-video overflow-hidden">
                                                <img 
                                                    src={item.image_url} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                                                    <p className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider mb-0.5">{item.style}</p>
                                                    <p className="text-xs text-white font-bold line-clamp-2">{item.title}</p>
                                                </div>
                                            </div>
                                            <div className="p-3 flex items-center justify-between border-t border-slate-900/60">
                                                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{item.title}</span>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-900/40 text-pink-300 font-medium capitalize">
                                                    {item.color_scheme}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
