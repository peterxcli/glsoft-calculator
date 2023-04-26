import React, { useState } from "react";
import styled from "@emotion/styled";
import useStorage from "@/lib/useStorage";
import calculateInfixExpression from "@/lib/calculate";
import styles from "./Calculator.module.scss"

const App: React.FC = () => {
    const [expression, setExpression] = useState("");
    const [memory, setMemory] = useStorage('memory', 0);

    const handleButtonClick = (value: string) => {
        if (value === "=") {
            try {
                setExpression(calculateInfixExpression(expression).toString());
            } catch (error) {
                setExpression("Error");
            }
        } else if (value === "ac") {
            setExpression("");
        } else if (value === "m+") {
            setMemory(memory + parseFloat(expression));
        } else if (value === "m-") {
            setMemory(memory - parseFloat(expression));
        } else if (value === "mr") {
            setExpression(memory.toString());
        } else if (value === "mc") {
            setMemory(0);
        }
        else if (value === "\u232B") {
            setExpression(expression.slice(0, -1));
        }
        else {
            setExpression(expression + value);
        }
    };

    const buttons = [
        "mc", "m+", "m-", "mr",
        "1", "2", "3", "/",
        "4", "5", "6", "*",
        "7", "8", "9", "-",
        ".", "0", "=", "+",
        "%", "ac",  "\u232B"
    ];


    return (
        <div className={styles.container}>
            <div className={styles.calculator}>
                <input className={styles.input} value={expression} readOnly />
                {buttons.map((value) => (
                    <button className={styles.button} key={value} onClick={() => handleButtonClick(value)}>
                        {value.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
