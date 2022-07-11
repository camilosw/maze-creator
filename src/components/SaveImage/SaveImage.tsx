import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { useRecoilValue } from 'recoil';

import { ReactComponent as Download } from 'assets/download.svg';
import Walls from 'components/Walls';
import { configAtom, setupAtom } from 'services/config';

type CreateMazeImagePros = {
  onFinish(): void;
};

const CreateMazeImage = ({ onFinish }: CreateMazeImagePros) => {
  const isReRender = useRef(false);
  const config = useRecoilValue(configAtom);
  const width = config.width * config.gridSpacing + 4;
  const height = config.height * config.gridSpacing + 4;

  console.count('render create maze image');

  useEffect(() => {
    if (isReRender.current) return;
    isReRender.current = true;
    console.log('download');
    const maze = document.getElementById('maze-save');
    if (!maze) return;

    console.dir(maze);

    const url = URL.createObjectURL(
      new Blob([maze.outerHTML], { type: 'image/svg+xml;charset=utf-8' }),
    );

    const mazeImg = document.createElement('img');
    mazeImg.onload = () => {
      console.log(url);

      const canvas = document.createElement('canvas');
      canvas.width = maze.clientWidth;
      canvas.height = maze.clientHeight;
      canvas.getContext('2d')?.drawImage(mazeImg, 0, 0);
      const img = canvas.toDataURL('image/png');
      console.log(img);

      const link = document.createElement('a');
      link.download = 'maze.png';
      link.style.opacity = '0';
      document.body.appendChild(link);
      link.href = img;
      link.click();
      link.remove();
      console.log('end');
      onFinish();
    };
    mazeImg.src = url;
  }, []);

  return ReactDOM.createPortal(
    <svg
      width={width}
      height={height}
      id="maze-save"
      version="1.1"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#ffffff" />
      <g transform="translate(2,2)">
        <Walls isDownloadImage />
      </g>
    </svg>,
    document.getElementById('maze') as HTMLElement,
  );
};

const SaveImage = () => {
  const setup = useRecoilValue(setupAtom);
  const [saveImage, setSaveImage] = useState(false);

  console.count('render save image');

  return (
    <>
      <Button
        variant="light"
        onClick={() => setSaveImage(true)}
        title="Save maze image"
        disabled={setup}
      >
        <Download />
      </Button>
      {saveImage && <CreateMazeImage onFinish={() => setSaveImage(false)} />}
    </>
  );
};

export default SaveImage;
