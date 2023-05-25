import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { useAuth } from "@/hooks/useAuth";
import Meta from "@/components/seo/Meta";

import styles from "./signin.module.scss";

interface ISendingData {
    email: string,
    password: string,
    name?: string,
    confirmedPassword?: string
};

const Signin: FC = () => {
    const { login, logout } = useAuth();
    const router = useRouter();
    const [signin, setSignin] = useState(true);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        ...(!signin && {
            name: Yup.string().required('Name is required'),
            confirmedPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("Please confirm your password")
        })
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            confirmedPassword: ''
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values: ISendingData) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values: ISendingData): void => {
        const data: ISendingData = signin 
        ? {email: values.email, password: values.password}
        : {email: values.email, password: values.password, name: values.name}

        console.log(data)
    };

    {/* Signin
            <button onClick={() => login({name: 'Kirill', email: 'myEmail', token: 'sdf43', userId: 1})}>Sign in</button>
            <button onClick={logout}>Sign out</button> */}

    return (
        <Meta title="Sign in">
            <Link href="/" className={styles.back}>
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
            </Link>
            <div className={styles.signin}>
                <div className={styles.signin__wrapper}>
                    <div className={styles.signin__header}>
                        <div className={!signin ? styles.bottomHeader : ''}>
                            <h1>Sign in</h1>
                            <h2>Sign up</h2>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.signin__inputs}>
                            <div className={signin ? styles.hidden : ''}>
                                <input
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.name && formik.errors.name ? styles.inputError : ''}
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                />
                                {formik.errors.name && formik.touched.name && <p className={styles.errorMessage}>{formik.errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                />
                                {formik.errors.email && formik.touched.email && <p className={styles.errorMessage}>{formik.errors.email}</p>}
                            </div>
                            
                            <div>
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.password && formik.errors.password ? styles.inputError : ''}
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Password" 
                                />
                                {formik.errors.password && formik.touched.password && <p className={styles.errorMessage}>{formik.errors.password}</p>}
                            </div>

                            <div className={signin ? styles.hidden : ''}>
                                <input
                                    value={formik.values.confirmedPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.confirmedPassword && formik.errors.confirmedPassword ? styles.inputError : ''}
                                    type="password" 
                                    id="confirmedPassword" 
                                    name="confirmedPassword" 
                                    placeholder="Confirm password" 
                                />
                                {formik.errors.confirmedPassword && formik.touched.confirmedPassword && <p className={styles.errorMessage}>{formik.errors.confirmedPassword}</p>}
                            </div>
                        </div>
                        <div className={`${styles.signin__forgot} ${!signin ? styles.hidden : ''}`}>
                            <p>Forgot password?</p>
                        </div>
                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    </form>
                    <div className={styles.signin__separation}></div>
                    <div className={styles.signin__outside}>
                        tut google, potom facebook, eshe twitter i kogda-to apple
                    </div>
                </div>
                <div className={styles.signin__underneath}>
                    <div className={!signin ? styles.bottomUnderneath : ''}>
                        <p onClick={() => setSignin(false)}>Don’t have an account? <span>Sign up</span></p>
                        <p onClick={() => setSignin(true)}>Already have account? <span>Sign in</span></p>
                    </div>
                </div>
            </div>
        </Meta>
    )
}

export default Signin;