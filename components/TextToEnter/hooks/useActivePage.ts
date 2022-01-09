import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCurrentPage, getPageText } from '../helpers/getCurrentPage';
import { IScrollToPosition } from './useScrollToPosition';

export type IUpdateActivePage = (props: {
  currentPage: number;
  forceUpdate?: boolean;
}) => void;

export interface IPage {
  name: string | number;
  onSelect: () => void;
}

interface IUseActivePage {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  fullText: string;
  headerRef: RefObject<HTMLElement>;
  selectedRef: RefObject<HTMLElement>;
  isPositionEditable: boolean;
  currentPage: number;
  pressedLetter: string;
  scrollToPosition: IScrollToPosition;
}

export const useActivePage = ({
  setText,
  fullText,
  headerRef,
  selectedRef,
  currentPage,
  pressedLetter,
  scrollToPosition,
  isPositionEditable,
}: IUseActivePage) => {
  const [activePage, setActivePage] = useState(0);

  const pages: IPage[] = useMemo(
    () =>
      Array.from(
        { length: 1 + getCurrentPage({ position: fullText.length }) },
        (_, i) => {
          return {
            name: i,
            onSelect: () => {
              setText(getPageText({ currentPage, fullText }));
              setActivePage(i);
            },
          };
        }
      ),
    [fullText]
  );

  const updateActivePage = useCallback(
    ({ currentPage, forceUpdate = false }) => {
      if (activePage !== currentPage || forceUpdate) {
        setActivePage(currentPage);
        setText(getPageText({ currentPage, fullText }));
        scrollToPosition({ forceScroll: forceUpdate });
      }
    },
    [activePage, headerRef, selectedRef, fullText, isPositionEditable]
  );

  useEffect(() => {
    updateActivePage({ currentPage, forceUpdate: true });
    selectedRef.current?.focus();
  }, [currentPage, selectedRef]);

  useEffect(() => {
    if (currentPage !== activePage) {
      updateActivePage({ currentPage });
    }
  }, [pressedLetter, fullText]);

  return {
    pages,
    activePage,
    updateActivePage,
  };
};
