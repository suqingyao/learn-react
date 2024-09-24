import { useEffect } from 'react';
import styles from './style.module.css';

const IntersectionDemo = () => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      function (entries) {
        console.log('info:');
        entries.forEach((item) => {
          console.log(item.target, item.intersectionRatio);
        });
      },
      {
        threshold: [0.5, 1]
      }
    );

    intersectionObserver.observe(document.querySelector('#box1')!);
    intersectionObserver.observe(document.querySelector('#box2')!);
  }, []);

  return (
    <>
      <div
        id="box1"
        className={styles.box1}
      >
        BOX1
      </div>
      <div
        id="box2"
        className={styles.box2}
      >
        BOX2
      </div>
    </>
  );
};

export default IntersectionDemo;
