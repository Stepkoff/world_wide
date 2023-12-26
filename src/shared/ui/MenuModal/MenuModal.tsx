import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group'
import s from './menuModal.module.sass'
import animationStyles from './menuModalAnimations.module.sass';
import {useKeyboard} from "@/shared/lib/KeyboardManager";
import {Portal} from "@/shared/ui/Portal";

const ANIMATION_TIME = 200

const useMount = ({isOpened}: {isOpened: boolean}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if(isOpened && !mounted) {
      setMounted(true);
    } else if (!isOpened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [isOpened])
  return {mounted}
}

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};
const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface layoutProps {
  children: React.ReactNode
  onClose: () => void
  isOpened: boolean
  elemRef: React.RefObject<HTMLButtonElement>
}
export const Layout = ({ onClose, children, isOpened, elemRef }: layoutProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = useState(false);
  const [position, setPosition] = useState({
    left: 0,
    top: 0
  })

  useKeyboard({
    key: 'Escape',
    callback: onClose,
    disabled: false,
  });

  useLayoutEffect(() => {
    setPosition({
      top: elemRef.current ? elemRef.current.offsetTop + elemRef.current.offsetHeight + 5 : 0,
      left: elemRef.current && contentRef.current ? elemRef.current.offsetLeft - contentRef.current.offsetWidth + elemRef.current.offsetWidth : 0
    })
  }, [elemRef, animationIn])
  useEffect(() => {
    document.body.classList.add('modalOpen')
    return () => {
      document.body.classList.remove('modalOpen')
    }
  }, [])
  useEffect(() => {
    setAnimationIn(isOpened);
  }, [isOpened]);
  return (
    <div className={s.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <div ref={overlayRef} className={s.overlay} onClick={onClose} />
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div style={{
          position: 'absolute',
          top: position.top,
          left: position.left
        }} ref={contentRef} className={s.content}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

interface MenuModalProps {
  children: React.ReactNode
  isOpened: boolean
  onClose: () => void
  elemRef: React.RefObject<HTMLButtonElement>
}

export const MenuModal = ({children, isOpened, onClose, elemRef}: MenuModalProps) => {

  const { mounted } = useMount({ isOpened });
  if (!mounted) {
    return null;
  }
  return (
    <Portal>
      <Layout elemRef={elemRef} onClose={onClose} isOpened={isOpened}>
        {children}
      </Layout>
    </Portal>
  );
};