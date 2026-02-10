/**
 * FloatingGroup Component
 *
 * Floating action buttons for navigation and utilities.
 * - Scroll to top/bottom
 * - Christmas effects toggle
 * - Expand/collapse toggle
 */

import { bgmConfig, christmasConfig } from '@constants/site-config';
import { useIsMounted } from '@hooks/useIsMounted';
import { Icon } from '@iconify/react';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $bgmPanelOpen, toggleBgmPanel } from '@store/bgm';
import { christmasEnabled, disableChristmasCompletely, enableChristmas, initChristmasState } from '@store/christmas';
import { $isDrawerOpen } from '@store/modal';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const FloatingGroupStyles = () => {
  return (
    <style jsx global>{`
      .loading-taichi {
        opacity: 0.8;
      }
      
      .loading-taichi.rotate {
        animation: rotate-all 2s linear infinite;
      }
      
      @keyframes rotate-all {
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  );
};

interface FloatingButtonProps {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FloatingButton({ onClick, ariaLabel, title, children, className }: FloatingButtonProps) {
  const isMounted = useIsMounted();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full bg-background/80 p-3 opacity-80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-background hover:opacity-100 cursor-pointer',
        className,
      )}
      style={{ 
        width: '50px', 
        height: '50px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#E9536A';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '';
      }}
      aria-label={ariaLabel}
      title={isMounted ? title : undefined}
    >
      {children}
    </button>
  );
}

export default function FloatingGroup() {
  const [isExpanded, setIsExpanded] = useState(true);
  const isDrawerOpen = useStore($isDrawerOpen);
  const isChristmasEnabled = useStore(christmasEnabled);
  const isBgmPanelOpen = useStore($bgmPanelOpen);

  // Initialize christmas state on mount
  useEffect(() => {
    initChristmasState();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  const toggleChristmas = () => {
    if (christmasEnabled.get()) {
      disableChristmasCompletely();
    } else {
      enableChristmas();
    }
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Hide when drawer is open
  const isHidden = isDrawerOpen;

  return (
    <>
      <FloatingGroupStyles />
      <motion.div
        className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 text-primary"
        animate={{
          x: isHidden ? 200 : 0,
          opacity: isHidden ? 0 : 1,
          pointerEvents: isHidden ? 'none' : 'auto',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col gap-2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
              {christmasConfig.enabled && (
                <FloatingButton onClick={toggleChristmas} ariaLabel="切换圣诞特效" title="切换圣诞特效">
                  <Icon icon={isChristmasEnabled ? 'ri:snowy-fill' : 'ri:snowy-line'} className="h-6 w-6" />
                </FloatingButton>
              )}
              {bgmConfig.enabled && bgmConfig.audio.length > 0 && (
                <FloatingButton onClick={toggleBgmPanel} ariaLabel="背景音乐" title="背景音乐">
                  <Icon icon={isBgmPanelOpen ? 'ri:music-2-fill' : 'ri:music-2-line'} className="h-6 w-6" />
                </FloatingButton>
              )}
              <FloatingButton onClick={scrollToTop} ariaLabel="回到顶部" title="回到顶部">
                <Icon icon="ri:arrow-up-s-line" className="h-6 w-6" />
              </FloatingButton>
              <FloatingButton onClick={scrollToBottom} ariaLabel="滚到底部" title="滚到底部">
                <Icon icon="ri:arrow-down-s-line" className="h-6 w-6" />
              </FloatingButton>
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingButton onClick={toggleExpand} ariaLabel="展开/收起工具栏" title="展开/收起工具栏" className="flex-center">
          <div className="loading-taichi rotate flex items-center justify-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M303.5 432A80 80 0 0 1 291.5 592A80 80 0 0 1 303.5 432z"
                fill="currentColor"
              ></path>
              <path
                d="M512 65A447 447 0 0 1 512 959L512 929A417 417 0 0 0 512 95A417 417 0 0 0 512 929L512 959A447 447 0 0 1 512 65z M512 95A417 417 0 0 1 929 512A208.5 208.5 0 0 1 720.5 720.5L720.5 592A80 80 0 0 0 720.5 432A80 80 0 0 0 720.5 592L720.5 720.5A208.5 208.5 0 0 1 512 512A208.5 208.5 0 0 0 303.5 303.5A208.5 208.5 0 0 0 95 512A417 417 0 0 1 512 95z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </FloatingButton>
      </motion.div>
    </>
  );
}
