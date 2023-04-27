import React, { useState } from "react";
import useStorage from "@/lib/useStorage";
import calculateInfixExpression from "@/lib/calculate";
import { isNumber } from "@/lib/calculate";

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
            setMemory(memory + (isNumber(expression) ? parseFloat(expression) : 0));
        } else if (value === "m-") {
            setMemory(memory - (isNumber(expression) ? parseFloat(expression) : 0));
        } else if (value === "mr") {
            if (isNumber(expression)) {
                setExpression(memory.toString());
            }
            else if (!isNumber(expression.slice(-1))) {
                setExpression(expression + memory.toString());
            }
        } else if (value === "mc") {
            setMemory(0);
        }
        else if (value === "\u232B") {
            setExpression(expression.slice(0, -1));
        }
        else {
            if (value === ".") {
                if (expression.endsWith(".")) {
                    return;
                }
                if (expression === "") {
                    value = "0.";
                }
            }
            else if (!isNumber(value)) {
                if (expression.endsWith(value) || expression === "") {
                    return;
                }
            }
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
        <div className="container">
            <div className="calculator">
                <input className="input" value={expression} readOnly />
                {buttons.map((value) => (
                    <button className="button" key={value} onClick={() => handleButtonClick(value)}>
                        {value.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
