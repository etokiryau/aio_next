import { FC, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import MainLayout from "@/components/layouts/mainLayout/MainLayout";

import styles from "./services.module.scss";

interface IForm {
    service: string,
    area: number,
    sections: string[],
    email: string,
    name: string,
    telephone: string,
    comment: string,
}

interface ISendingData extends IForm {
    cost: number
}

const Services: FC = () => {
    const [areaValue, setAreaValue] = useState('500');

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        telephone: Yup.string().min(10, 'At least 10 digits').required('Phone number is required'),
        sections: Yup.array().min(1).required('At least 1 section is required')
    });

    const formik = useFormik({
        initialValues: {
            service: 'individual',
            area: -1050,
            sections: ['architecture'],
            email: '',
            name: '',
            telephone: '',
            comment: '',
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    const areaRangeHelperStyle = {
        left: `calc(${(formik.values.area + 1450 ) * 100 / 2900}% - ${formik.values.area * 7.5 / 1450}px)`
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = event.target.checked;
        const value: string = event.target.value;
    
        if (isChecked) {
            formik.setFieldValue(
                'sections', 
                [...formik.values.sections, value]
            );
        } else {
            formik.setFieldValue(
                'sections',
                formik.values.sections.filter((section: string) => section !== value),
            );
        }
    };

    const calculateCost = (): number => {
        if (!formik.values.service || formik.values.sections.length === 0) {
            return 0;
        }

        let cost: number;
        let service: number;

        switch (formik.values.service) {
            case 'individual':
                service = 15;
                break;
            case 'modelling':
                service = 7;
                break;
            case 'changes':
                service = 3;
                break;
            default:
                service = 0; 
        }

        const sections: number = formik.values.sections.reduce((sum: number, cur: string) => {
            switch (cur) {
                case 'architecture':
                    return sum + 0.4;
                case 'structure':
                    return sum + 0.3;
                case 'mep':
                    return sum + 0.3;
                default:
                    throw new Error('There is no such section')
            };
        }, 0)
        
        cost = service * (formik.values.area + 1550) * sections;

        return cost;
    }

    const cost: number = Math.ceil(calculateCost());

    const handleSubmit = async (values: IForm): Promise<void> => {
        const sendingData: ISendingData = {
            ...values,
            area: formik.values.area + 1550,
            cost
        };

        console.log(sendingData)
    };

    const handleAreaWindowBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: number = Number(event.target.value);
        if (value > 3000) {
            setAreaValue(String(3000));
            formik.setFieldValue('area', 3000 - 1550);
        } else if (value < 100) {
            setAreaValue(String(100));
            formik.setFieldValue('area', 100 - 1550);
        } else {
            formik.setFieldValue('area', value - 1550);
        };
    };

    const handleAreaWindowChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAreaValue(event.target.value);
    };

    const handleAreaRangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        formik.setFieldValue('area', Number(event.target.value));
        setAreaValue(String(Number(event.target.value) + 1550))
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const value: number = Number(areaValue);
            if (value > 3000) {
                setAreaValue(String(3000));
                formik.setFieldValue('area', 3000 - 1550);
            } else if (value < 100) {
                setAreaValue(String(100));
                formik.setFieldValue('area', 100 - 1550);
            } else {
                formik.setFieldValue('area', value - 1550);
            };
        }
    };

    return (
        <MainLayout title="Services">
            <div className={styles.services}>
                <section className={styles.services__header}>
                    <h1>Order your unique project</h1>
                    <h2>Preliminary calculation of the project cost</h2>
                </section>

                <section className={styles.services__content}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.services__content_calculation}>
                            <div className={styles.services__content_calculation_service}>
                                <p>Basic services</p>
                                <label htmlFor="individual">
                                    <input type="radio" name="service" id="individual" value='individual'
                                        data-value='15' 
                                        checked={formik.values.service === 'individual'}
                                        onChange={formik.handleChange}></input>
                                    Individual design
                                </label>
                                <label htmlFor="dimension">
                                    <input type="radio" name="service" id="dimension" value='modelling'
                                        data-value='7' 
                                        checked={formik.values.service === 'modelling'}
                                        onChange={formik.handleChange}/>
                                    2D to 3D
                                </label>
                                <label htmlFor="changes">
                                    <input type="radio" name="service" id="changes" value='changes'
                                    data-value='3'
                                    checked={formik.values.service === 'changes'}
                                    onChange={formik.handleChange}/>
                                    Making changes to the finished project
                                </label>
                            </div>

                            <div className={styles.services__content_calculation_section}>
                                <p className={formik.errors.sections ? styles.errorSections : ''}>Design sections</p>
                                <label htmlFor="section-individual">
                                    <input type="checkbox" name="sections" id="section-individual" value="architecture"
                                        data-value='0.4'
                                        checked={formik.values.sections.includes('architecture')}
                                        onChange={handleCheckboxChange} />
                                    Architecture
                                </label>
                                <label htmlFor="section-dimension">
                                    <input type="checkbox" name="sections" id="section-dimension" value="structure"
                                        data-value='0.3'
                                        checked={formik.values.sections.includes('structure')}
                                        onChange={handleCheckboxChange} />
                                    Structural engineering
                                </label>
                                <label htmlFor="section-changes">
                                    <input type="checkbox" name="sections" id="section-changes" value="mep" 
                                        data-value='0.3'
                                        checked={formik.values.sections.includes('mep')}
                                        onChange={handleCheckboxChange} />
                                    Mechanical, electrical and plumbing
                                </label>
                            </div>

                            <div className={styles.services__content_calculation_area}>
                                <p>House area</p>
                                <label htmlFor="area">
                                    <div style={areaRangeHelperStyle}>
                                        <input type="number"
                                            value={areaValue}
                                            onChange={handleAreaWindowChange}
                                            onBlur={handleAreaWindowBlur}
                                            onKeyDown={handleKeyDown}
                                        />
                                        m
                                    </div>
                                    <input type="range" name="area" id="area" min="-1450" max="1450" step="25" 
                                        value={formik.values.area} 
                                        onChange={handleAreaRangeChange}
                                        style={{backgroundSize: `${(formik.values.area + 1450 ) * 100 / 2900}% 100%`}} />
                                </label>
                                <datalist id="area">
                                    <option value="100" label="100 m"></option>
                                    <option value="3000" label="3000 m"></option>
                                </datalist>
                            </div>
                        </div>

                        <div className={styles.services__content_total}>
                            <p>Project cost</p>
                            <div className={styles.services__content_submit_total_cost}>Total: {cost} USD</div>
                        </div>
                        
                        <h3>Submit application</h3>

                        <div className={styles.services__content_submit}>
                            <div className={styles.services__content_submit_info}>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                />
        
                                <input
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // className={formik.touched.name && formik.errors.name ? styles.inputError : ''}
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                />
                            
                                <input
                                    value={formik.values.telephone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // className={formik.touched.telephone && formik.errors.telephone ? styles.inputError : ''}
                                    id="telephone"
                                    name="telephone"
                                    placeholder="Phone number"
                                    type="tel"
                                />

                                <textarea
                                    value={formik.values.comment}
                                    onChange={formik.handleChange}
                                    id="comment"
                                    name="comment"
                                    placeholder="Comment"
                                />
                            </div>

                            <div className={styles.services__content_submit_total}>
                                <div>
                                    <p>Project cost</p>
                                    <div className={styles.services__content_submit_total_cost}>Total: {cost} USD</div>
                                </div>
                                
                                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                            </div>
                        </div>
                        <button id={styles.mobileSubmit} type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    </form>
                </section>
            </div>
        </MainLayout>
    )
}

export default Services;