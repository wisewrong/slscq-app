import { useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { save } from '@tauri-apps/api/dialog';
import { writeTextFile } from '@tauri-apps/api/fs';
import generator, { DEFAULT_KEYWORD, type ContentType } from './generator';
import './App.css';

function App() {
  const [content, setContent] = useState<ContentType>();
  const [range, setRange] = useState<number>(500);
  const [keyword, setKeyword] = useState<string>(DEFAULT_KEYWORD);

  const hanldeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e?.target?.value;
    setKeyword(v);
  }

  const hanldeRange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e?.target?.value;
    setRange(Number(v) || 0);
  }

  const handleSubmit = () => {
    const res = generator(keyword, range);
    setContent(res);
  }

  const handleDownload = async () => {
    if (!content) return;
    const filePath = await save({
      defaultPath: `${keyword}.txt`,
    });
    if (!filePath) return;
    writeTextFile(filePath, content.plaintext);
  }

  return (
    <>
      <h1 className="title">申论生成器</h1>
      <div className="ctrl-box">
        <input type="text" placeholder={keyword} id="themeInputEl" onChange={hanldeInput} />
        <div className="num-box">
          <span id="numEl">{range}</span>
          <input type="range" value={range} min={50} max={5000} step={1} id="numInputEl" onChange={hanldeRange} />
        </div>
        <div>
          <button id="submit" className='button' onClick={handleSubmit}>生成报道</button>
          {
            content && (
              <button className='button' id="download" onClick={handleDownload}>下载文件</button>
            )
          }
        </div>
      </div>
      {
        content && (
          <div id="post" dangerouslySetInnerHTML={{ __html: content.html }}></div>
        )
      }
    </>
  )
}

export default App
