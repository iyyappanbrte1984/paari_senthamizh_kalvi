import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-4"
  >
    <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
      >
        <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-4"
      >
        Oops! Something went wrong
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-neutral-600 dark:text-neutral-300 mb-6"
      >
        We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Try Again
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Go Home
        </button>
      </motion.div>

      {process.env.NODE_ENV === 'development' && (
        <motion.details
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-left"
        >
          <summary className="cursor-pointer text-sm text-neutral-500 dark:text-neutral-400 mb-2">
            Error Details (Development Only)
          </summary>
          <pre className="text-xs bg-neutral-100 dark:bg-neutral-900 p-3 rounded-lg overflow-auto max-h-32">
            {error.message}
          </pre>
        </motion.details>
      )}
    </div>
  </motion.div>
);

const logError = (error, errorInfo) => {
  // Log to your error reporting service
  console.error('Error caught by boundary:', error, errorInfo);

  // You can integrate with services like Sentry, LogRocket, etc.
  // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
};

export const AppErrorBoundary = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={logError}
    onReset={() => {
      // Clear any cached data that might be causing issues
      window.location.reload();
    }}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorFallback;