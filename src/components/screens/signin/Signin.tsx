import { FC } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/hooks/useAuth";
import Meta from "@/components/seo/Meta";

import styles from "./signin.module.scss";
import { Formik, Field, Form, useFormik } from "formik";

interface ISendingData {
    email: string,
    password: string,
    name?: string,
    confirmedPassword?: string
};

const Signin: FC = () => {
    const { login, logout } = useAuth();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            confirmedPassword: ''
        },
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values: ISendingData): void => {

    };

    {/* Signin
            <button onClick={() => login({name: 'Kirill', email: 'myEmail', token: 'sdf43', userId: 1})}>Sign in</button>
            <button onClick={logout}>Sign out</button> */}

    return (
        <Meta title="Signin">
            <div className={styles.signin}>
                <h1>Sign in</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        confirmedPassword: ''
                    }}
                    onSubmit={() => {}}
                >
                    <Form>
                        <div className={styles.signin__inputs}>

                            <Field
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                id="name"
                                name="name"
                                placeholder="Name"
                                type="text"
                            />

                            <Field
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                            />

                            <Field
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Password" 
                            />

                            <Field
                                value={formik.values.confirmedPassword}
                                onChange={formik.handleChange}
                                type="password" 
                                id="confirmedPassword" 
                                name="confirmedPassword" 
                                placeholder="Confirm password" 
                            />
                        </div>
                        <button type="submit" disabled={false}>Submit</button>
                    </Form>
                </Formik>
                <div className={styles.signin__separation}></div>
                <div className={styles.signin__outside}>
                    всякие кнопки
                </div>
            </div>
        </Meta>
    )
}

export default Signin;