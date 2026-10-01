import React, { useState } from 'react';
import { Trophy, X } from 'lucide-react';

// LeetCode's API sends no CORS headers, so these are static. Update them
// periodically (leetcode.com/u/neerajkumhar2005) to keep the numbers current.
const LEETCODE_USERNAME = 'neerajkumhar2005';
const PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}`;

const STATS = {
    totalSolved: 109,
    easySolved: 50,
    mediumSolved: 47,
    hardSolved: 12
};

const LeetCodeStats: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="label py-1.5 text-[var(--text-faint)] hover:text-[var(--text)] transition-colors duration-150 inline-flex items-center gap-1.5"
            >
                <Trophy className="h-3.5 w-3.5" />
                <span className="hidden md:inline">LeetCode</span>
                <span className="md:hidden">{STATS.totalSolved}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-[var(--bg-raised)] border border-[var(--rule)] rounded-md p-4 z-50">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 label text-[var(--text-faint)] hover:text-[var(--text)]"
                        aria-label="Close"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[var(--rule)] pr-6">
                        <span className="label text-[var(--text)]">Solved</span>
                        <span className="font-mono text-sm text-[var(--accent)]">
                            {STATS.totalSolved}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {([
                            { label: 'Easy', value: STATS.easySolved, color: 'var(--diff-easy)' },
                            { label: 'Medium', value: STATS.mediumSolved, color: 'var(--diff-medium)' },
                            { label: 'Hard', value: STATS.hardSolved, color: 'var(--diff-hard)' }
                        ]).map((row) => (
                            <div key={row.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="label text-[var(--text-faint)]">{row.label}</span>
                                    <span className="font-mono text-xs text-[var(--text-soft)]">
                                        {row.value}
                                    </span>
                                </div>
                                <div className="h-1 bg-[var(--bg-sunken)] rounded-full">
                                    <div
                                        className="h-1 rounded-full"
                                        style={{
                                            width: `${(row.value / STATS.totalSolved) * 100}%`,
                                            backgroundColor: row.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <a
                        href={PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block mt-4 pt-3 border-t border-[var(--rule)] label text-[var(--accent)] hover:underline"
                    >
                        View profile →
                    </a>
                </div>
            )}
        </div>
    );
};

export default LeetCodeStats;