import { memo, useMemo } from 'react';
import { Indicators } from '../Indicators';
import { LoadFile } from '../LoadFile';
import { Timer } from 'components/Timer';
import { EnteredLetterHint } from 'components/Header/EnteredLetterHint';
import styles from './styles.module.scss';
import { ILoadTextFunc, IText } from 'types/ILoadText';
import {
  IEnteredLetterHintProps,
  IIndicatorProps,
  ITimerProps,
} from 'types/IHomePage';
import { useTemporaryIndicators } from 'components/Header/useTemporaryIndicators';
import NewSession from 'components/NewSession';
import Profile from 'components/Profile';

interface IHeader {
  textData: IText;
  loadText: ILoadTextFunc;
  timerProps: ITimerProps;
  indicatorsProps: IIndicatorProps;
  enteredLetterHintProps: IEnteredLetterHintProps;
}

const Header = ({
  loadText,
  textData,
  timerProps,
  indicatorsProps,
  enteredLetterHintProps,
}: IHeader) => {
  const textLength = useMemo(() => textData.text.length, [textData]);
  const temporaryIndicators = useTemporaryIndicators({
    textData,
    time: timerProps.time,
    typoCounter: indicatorsProps.typoCounter,
    typedCounter: indicatorsProps.typedCounter,
  });

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.section}>
          <h4 className={styles.textName}>{textData.options.name}</h4>
          <LoadFile loadText={loadText} />
          <Timer {...timerProps} />
        </div>
        <EnteredLetterHint {...enteredLetterHintProps} />
        <Indicators
          textLength={textLength}
          {...indicatorsProps}
          {...temporaryIndicators.indicatorsProps}
        />
      </div>
      <NewSession {...temporaryIndicators} />
      <Profile />
    </header>
  );
};

export default memo(Header);
