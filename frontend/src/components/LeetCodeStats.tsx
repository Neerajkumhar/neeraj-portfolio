import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, Circle, AlertCircle, X, Loader2 } from 'lucide-react';

interface LeetCodeData {
    status: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalQuestions: number;
}

const LeetCodeStats: React.FC = () => {
    const [stats, setStats] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://leetcode-stats-api.herokuapp.com/neerajkumhar2005');
                const data = await response.json();

                if (data.status === 'success') {
                    setStats(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 animate-pulse">
                <Trophy className="h-5 w-5" />
                <span className="hidden md:inline">Loading...</span>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <a
                href="https://leetcode.com/u/neerajkumhar2005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                title="Stats unavailable. Click to view profile."
            >
                <Trophy className="h-5 w-5 text-gray-400" />
                <span className="hidden md:inline">LeetCode</span>
            </a>
        );
    }

    return (
        <div className="relative group">
            <button
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="hidden md:inline">LeetCode</span>
                <span className="md:hidden">LC: {stats.totalSolved}</span>
            </button>

            {/* Popover */}
            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50 transform transition-all duration-200"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-700 pb-2 pr-6">
                        <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            Progress
                        </span>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {stats.totalSolved} Solved
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Easy
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{stats.easySolved}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(stats.easySolved / stats.totalSolved) * 100}%` }}></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-1">
                                <Circle className="h-3 w-3" /> Medium
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{stats.mediumSolved}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(stats.mediumSolved / stats.totalSolved) * 100}%` }}></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> Hard
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{stats.hardSolved}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${(stats.hardSolved / stats.totalSolved) * 100}%` }}></div>
                        </div>
                    </div>

                    <a
                        href="https://leetcode.com/u/neerajkumhar2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 text-center text-xs text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        View Profile →
                    </a>
                </div>
            )}
        </div>
    );
};

export default LeetCodeStats;
