// Course animation variants and configurations for Framer Motion

export const courseAnimations = {
  // Section transition animations
  section: {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  },

  // Progress bar animation
  progressBar: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },

  // Button animations
  button: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.8 }
  },

  // Section content container (for staggered children)
  sectionContent: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },

  // Individual content items within sections
  contentItem: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },

  // Special code element with bounce
  codeElement: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4
      }
    }
  }
};

// Animation timing constants
export const animationTimings = {
  sectionTransition: 0.6,
  staggerDelay: 0.2,
  buttonDelay: 0.8,
  fastTransition: 0.3,
  slowTransition: 0.8
};

// Easing functions
export const easings = {
  smooth: "easeOut",
  sharp: "easeIn",
  bouncy: "easeInOut"
};