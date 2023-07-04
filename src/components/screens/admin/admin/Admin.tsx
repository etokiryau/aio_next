import { FC } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTypedSelector, useTypedDispatch } from "@/hooks/useReduxHooks";
import { selectAdmin, setUser } from "./adminSlice";

import styles from "./admin.module.scss";

interface IFormData {
    email: string;
	password: string;
};

const Admin: FC = () => {
    const dispatch = useTypedDispatch();
    const { isLoggedin } = useTypedSelector(selectAdmin);

    const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required")
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema,
		validateOnMount: true,
		onSubmit: (values: IFormData) => {
			handleSubmit(values);
		}
	});

    const handleSubmit = (values: IFormData) => {
        dispatch(setUser());
    };

    return (
        <div className={styles.admin}>
            {!isLoggedin && <section className={styles.admin__signin}>
                <h2>Enter the account</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.admin__signin_inputs}>
                        <input
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.email &&
                                formik.errors.email
                                    ? styles.inputError
                                    : ""
                            }
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                        />
                        {formik.errors.email &&
                            formik.touched.email && (
                                <p className={styles.errorMessage}>
                                    {formik.errors.email}
                                </p>
                        )}

                        <input
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.password &&
                                formik.errors.password
                                    ? styles.inputError
                                    : ""
                            }
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                        {formik.errors.password &&
                            formik.touched.password && (
                                <p className={styles.errorMessage}>
                                    {formik.errors.password}
                                </p>
                        )}
                    </div>
                    
                    <button
                        className={styles.admin__signin_submit}
                        type="submit"
                        disabled={
                            !formik.isValid || formik.isSubmitting
                        }
                    >
                        Submit
                    </button>
                </form>
            </section>}

            {isLoggedin && <section className={styles.admin__navigation}>
                <h2>Welcome Mikhail!</h2>
                <div className={styles.admin__navigation_links}>
                    <Link href="/admin/projects">
                        <h3>Projects</h3>
                    </Link>
                    <Link href="/admin/accounts">
                        <h3>Accounts</h3>
                    </Link>
                </div>
            </section>}
        </div>
    )
}

export default Admin;