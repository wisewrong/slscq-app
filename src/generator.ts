import data from './assets/data.json';

export type ContentType =  {
  title: string;
  plaintext: string;
  html: string;
};

export const DEFAULT_KEYWORD = '年轻人买房';

const get_random_num = (total: number) => Math.floor(Math.random() * total);
const get_random = (arr: string[]) => arr[get_random_num(arr.length)];
const get_title = () => get_random(data['title']);
const get_noun = () => get_random(data['noun']);
const get_verb = () => get_random(data['verb']);
const get_phrase = () => get_random(data['phrase']);
const get_sentence = () => get_random(data['sentence']);
const get_parallel_sentence = () => get_random(data['parallel_sentence']);
const get_beginning = () => get_random(data['beginning']);
const get_body = () => get_random(data['body']);
const get_ending = () => get_random(data['ending']);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replace_key = (str: string, key: RegExp | string, theme: any) =>
  str.replace(new RegExp(key, 'g'), theme);
const replace_xx = (str: string, theme: string) => replace_key(str, 'xx', theme);
const replace_vn = (str: string) =>
  replace_key(str, /vn/g, () => {
    const vns: number[] = [];
    vns.length = get_random_num(4) + 1;
    vns.fill(0);
    return vns.map(() => get_verb() + get_noun()).join('，');
  });
const replace_v = (str: string) => replace_key(str, 'v', get_verb);
const replace_n = (str: string) => replace_key(str, 'n', get_noun);
const replace_ss = (str: string) => replace_key(str, 'ss', get_sentence);
const replace_sp = (str: string) => replace_key(str, 'sp', get_parallel_sentence);
const replace_p = (str: string) => replace_key(str, 'p', get_phrase);

const replace_all = (str: string, theme: string) => {
  str = replace_vn(str);
  str = replace_v(str);
  str = replace_n(str);
  str = replace_ss(str);
  str = replace_sp(str);
  str = replace_p(str);
  str = replace_xx(str, theme);
  return str;
};

const generator = (theme = DEFAULT_KEYWORD, essay_num = 500): ContentType => {
  const begin_num = essay_num * 0.15; //开头字数
  const body_num = essay_num * 0.7; // 主题
  const end_num = begin_num; //结尾字数相同

  const title = replace_all(get_title(), theme);
  let begin = '';
  let body = '';
  let end = '';

  while (begin.length < begin_num) {
    begin += replace_all(get_beginning(), theme);
  }

  while (body.length < body_num) {
    body += replace_all(get_body(), theme);
  }

  while (end.length < end_num) {
    end += replace_all(get_ending(), theme);
  }

  return {
    title,
    plaintext: `${title}\n${begin}\n${body}\n${end}`,
    html: `<h1>${title}</h1>\n<p>${begin}</p>\n<p>${body}</p>\n<p>${end}</p>`,
  };
};

export default generator;
