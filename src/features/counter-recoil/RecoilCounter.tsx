import { useState } from "react";

import {
  countAtom,
} from "./counterSlice";
import styles from "./Counter.module.css";
import { useRecoilState } from "recoil";
import { fetchCount } from "./counterAPI";

export function RecoilCounter() {
  const [count, setCount] = useRecoilState(countAtom);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  const loadAmount = (amount: number) => {
    setCount((state) => ({
      value: amount,
      status: state.status,
    }));
  };

  const incrementByAmount = (amount: number) => {
    loadAmount(count.value + amount);
  };

  const incrementIfOdd = () => {
    if (count.value % 2 === 1) {
      incrementByAmount(incrementValue);
    }
  };  

  const increment = () => {
    incrementByAmount(1);
  };

  const decrement = () => {
    incrementByAmount(-1);
  };  

  const incrementLoadingAsync = async () => {

    try {
      setCount((state) => ({
        ...state,
        status: "loading",
      }))
      const newCount = (await fetchCount(incrementValue)).data;
      loadAmount(newCount);      
    } catch (e) {
      setCount((state) => ({
        ...state,
        status: "failed",
      }))
    }
    

  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={decrement}
        >
          -
        </button>
        <span className={styles.value}>{count.value}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => incrementByAmount(+incrementValue)}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => incrementLoadingAsync()}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => incrementIfOdd()}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
