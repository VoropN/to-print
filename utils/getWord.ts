interface IGetWord {
  position: number;
  text: string;
}

export type IWordData = {
  position: { start: number; end: number };
  text: { start: string; end: string };
} | null;

export const getWord = ({ position, text }: IGetWord): IWordData => {
  const textLength = text.length;

  const wordData = {
    position: { start: position, end: position },
    text: { start: '', end: '' },
  };

  const letter = text[position];
  if (!/\s+/.test(letter)) {
    while (
      wordData.position.start > 0 &&
      !/\s+|[-—]/.test(text[--wordData.position.start])
    ) {
      wordData.text.start = text[wordData.position.start] + wordData.text.start;
    }
    while (
      !/[-—]/.test(text[wordData.position.end++]) &&
      !/\s+/.test(text[wordData.position.end]) &&
      wordData.position.end < textLength
    ) {
      wordData.text.end += text[wordData.position.end];
    }
    wordData.position.start && ++wordData.position.start;
  } else {
    ++wordData.position.end;
  }

  return wordData;
};
