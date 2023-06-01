"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";

import styles from "./emailConfirmation.module.scss";

interface IProps {
    email: string
};

const EmailConfirmation: FC<IProps> = ({ email }) => {
    const [seconds, setSeconds] = useState(60);
    const [isFailed, setisFailed] = useState(false);
    const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

    const formik = useFormik({
        initialValues: {
            '0': '',
            '1': '',
            '2': '',
            '3': ''
        },
        onSubmit: () => {}
    });

    const hideEmail = (email: string): string => {
        const parts = email.split('@');
        const username = parts[0];
        const domain = parts[1].split('.')[0];
        const topLevelDomain = parts[1].split('.')[1]
        
        const hiddenUsername = username.slice(0, 3) + '*'.repeat(username.length - 3);
        const hiddenDomain = '*'.repeat(domain.length);
        
        return hiddenUsername + '@' + hiddenDomain + '.' + topLevelDomain;
    };

    const handleRepeatSendingCode = () => {
        setSeconds(60);
        setisFailed(false);
        formik.setFieldValue('0', '');
        formik.setFieldValue('1', '');
        formik.setFieldValue('2', '');
        formik.setFieldValue('3', '');
    };

    useEffect(() => {
        const timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
    
        if (seconds === 0) {
            clearInterval(timer);
        }
    
        return () => clearInterval(timer);
    }, [seconds]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, [])

    useEffect(() => {
        inputRefs.current.forEach((item, i) => {
            if (item?.disabled) formik.setFieldValue(String(i), '');
            if (!item?.disabled) inputRefs.current[i + 1]?.focus();
        })
    }, [formik.values]);

    useEffect(() => {
        if (formik.values[3]) {
            setisFailed(true);
        }
    }, [formik.values]);

    return (
        <div className={styles.confirmation}>
            <h3>Email confirmation</h3>
            <p>We have sent you a code to an email address {hideEmail(email)}. Please, type it below</p>
            <div className={`${styles.confirmation__inputs} ${isFailed ? styles.failed : ''}`}>
                <input ref={(ref) => inputRefs.current[0] = ref} id="0" name="0" onChange={formik.handleChange} value={formik.values[0]} disabled={false} type="number" min="0" max="9" />
                <input ref={(ref) => inputRefs.current[1] = ref} id="1" name="1" onChange={formik.handleChange} value={formik.values[1]} disabled={!formik.values[0]} type="number" min="0" max="9" />
                <input ref={(ref) => inputRefs.current[2] = ref} id="2" name="2" onChange={formik.handleChange} value={formik.values[2]} disabled={!formik.values[0] || !formik.values[1]} type="number" min="0" max="9" />
                <input ref={(ref) => inputRefs.current[3] = ref} id="3" name="3" onChange={formik.handleChange} value={formik.values[3]} disabled={!formik.values[0] || !formik.values[1] || !formik.values[2]} type="number" min="0" max="9" />
            </div>
            <button onClick={handleRepeatSendingCode} disabled={seconds !== 0} type="button">
                {isFailed && <span className={styles.failed}>Incorrect code! </span>}
                <span id={styles.send}>Send again</span> 
                {seconds !== 0 && <span> in {seconds} seconds</span>}
            </button>
        </div>
    )
}

export default EmailConfirmation;