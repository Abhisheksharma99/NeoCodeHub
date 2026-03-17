"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiSparkles, HiBuildingOffice2, HiRocketLaunch, HiChatBubbleLeftRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import ContactButton from "./ContactButton";
import type { ProposalData } from "@/lib/personalization";

const easeOut = [0.16, 1, 0.3, 1] as const;

const refLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  email: "Email",
  twitter: "Twitter",
  upwork: "Upwork",
  fiverr: "Fiverr",
  clutch: "Clutch",
  referral: "Referral",
};

const serviceColors: Record<string, string> = {
  "Web Development": "bg-blue-50 text-blue-700 border-blue-200",
  "Mobile Development": "bg-purple-50 text-purple-700 border-purple-200",
  "Ai Ml": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cloud Solutions": "bg-sky-50 text-sky-700 border-sky-200",
  "Ui Ux Design": "bg-pink-50 text-pink-700 border-pink-200",
  "Devops": "bg-orange-50 text-orange-700 border-orange-200",
};

export function PersonalizedProposalBanner({ data }: { data: ProposalData }) {
  const [dismissed, setDismissed] = useState(false);
  const [showCompact, setShowCompact] = useState(false);

  if (!data.name) return null;

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => setShowCompact(true), 400);
  };

  const serviceColorClass =
    data.service && serviceColors[data.service]
      ? serviceColors[data.service]
      : "bg-neutral-50 text-neutral-700 border-neutral-200";

  return (
    <>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -60, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="fixed top-0 left-0 right-0 z-[100]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/5 via-transparent to-transparent blur-2xl pointer-events-none" />

              <div className="relative mx-auto max-w-4xl px-4 pt-4">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />

                  <div className="relative px-6 py-5 sm:px-8 sm:py-6">
                    <button
                      onClick={handleDismiss}
                      className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all duration-300 cursor-pointer"
                      aria-label="Dismiss banner"
                    >
                      <HiXMark className="h-4 w-4" />
                    </button>

                    <div className="flex flex-wrap items-start gap-4 mb-3">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 shadow-lg">
                          <HiSparkles className="h-5 w-5 text-white" />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-1">
                            Exclusive Proposal
                          </p>
                          <h2 className="text-xl sm:text-2xl font-heading font-bold text-neutral-900 tracking-tight">
                            Prepared for{" "}
                            <span className="text-shimmer">{data.name}</span>
                          </h2>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.55 }}
                          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2"
                        >
                          {data.company && (
                            <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                              <HiBuildingOffice2 className="h-4 w-4 text-neutral-400" />
                              {data.company}
                            </span>
                          )}
                          {data.project && (
                            <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                              <HiRocketLaunch className="h-4 w-4 text-neutral-400" />
                              {data.project}
                            </span>
                          )}
                          {data.service && (
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${serviceColorClass}`}
                            >
                              {data.service}
                            </span>
                          )}
                          {data.ref && (
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                              <HiArrowTopRightOnSquare className="h-3 w-3" />
                              via {refLabels[data.ref] || data.ref}
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {data.message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-3 pt-3 border-t border-neutral-100"
                      >
                        <p className="flex items-start gap-2 text-sm text-neutral-500 italic">
                          <HiChatBubbleLeftRight className="h-4 w-4 text-neutral-300 mt-0.5 flex-shrink-0" />
                          &ldquo;{data.message}&rdquo;
                        </p>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.85 }}
                      className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3"
                    >
                      <p className="text-xs text-neutral-400">
                        This portfolio has been customized for your review
                      </p>
                      <ContactButton
                        headerText={
                          data.project
                            ? `Let's discuss ${data.project}`
                            : data.company
                            ? `Let's discuss your project, ${data.name}`
                            : "Let's discuss your project"
                        }
                        showProjectType={true}
                        btnText="Discuss This Project"
                        getQuote={true}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompact && (
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="fixed top-4 right-4 z-[100]"
          >
            <button
              onClick={() => {
                setShowCompact(false);
                setDismissed(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200 text-sm text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer"
            >
              <HiSparkles className="h-4 w-4 text-neutral-900" />
              <span>
                For{" "}
                <span className="text-neutral-900 font-semibold font-heading">
                  {data.name}
                </span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!dismissed && (
        <div className={data.message ? "h-56 sm:h-60" : "h-44 sm:h-48"} />
      )}
    </>
  );
}
