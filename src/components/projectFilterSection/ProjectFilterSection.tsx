import { FC } from "react";
import { useFormik } from "formik";

import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { selectProjects, togglePropertyFilter, resetFilters } from "../screens/main/projects/projectsSlice";
import { selectUserPreferences } from "@/components/userPreferences/userPreferencesSlice";
import Triangle from "@/components/ui/_icons/TriangleIcon";
import Cross from "@/components/ui/_icons/CrossIcon";
import { currencyData } from "@/utillis/preferenceData";

import styles from "./projectFilterSection.module.scss";

interface IInputs {
    minArea: string,
    maxArea: string,
    minCost: string,
    maxCost: string
};

const ProjectFilterSection: FC = () => {
    const dispatch = useTypedDispatch();
	const { filters } = useTypedSelector(selectProjects);
	const { currency } = useTypedSelector(selectUserPreferences);

    const formik = useFormik({
        initialValues: {
            minArea: '',
            maxArea: '',
            minCost: '',
            maxCost: ''
        },
        onSubmit: (values: IInputs) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values: IInputs) => {
        console.log(values)
    };

    const changeFilter = (type: string, value: string | number | null): void => {
        dispatch(togglePropertyFilter({[type]: value}))
    };

    return (
        <div className={styles.filters}>
            <form onSubmit={formik.handleSubmit} className={styles.filters__left}>
                <div
                    className={`${styles.filters__left_button} 
                    ${filters.floorNumber ? styles.activeButton : ""}`}
                >
                    <p>
                        Floors
                        {filters.floorNumber
                            ? `: ${filters.floorNumber}`
                            : ""}
                    </p>
                    {!filters.floorNumber ? (
                        <Triangle />
                    ) : (
                        <div className={ styles.filters__left_button_close}
                            onClick={() => changeFilter('floorNumber', null)}
                        >
                            <Cross />
                        </div>
                    )}

                    <div className={ styles.filters__left_button_popup}>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 1)}
                        >
                            1 floor
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 2)}
                        >
                            2 floors
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 3)}
                        >
                            3 floors
                        </p>
                    </div>
                </div>
                
                <div
                    className={`${styles.filters__left_button} 
                    ${filters.totalArea ? styles.activeButton : ""}`}
                >
                    <p>
                        Area
                        {filters.totalArea
                            ? `: ${filters.totalArea}`
                            : ""}
                    </p>
                    {!filters.totalArea ? (
                        <Triangle />
                    ) : (
                        <div className={styles.filters__left_button_close}
                            onClick={() => changeFilter('totalArea', null)}
                        >
                            <Cross />
                        </div>
                    )}
                    <div className={styles.filters__left_button_popup}>
                        <div className={styles.filters__left_button_popup_input}>
                            <p>minimum</p>
                            <div>
                                <input value={formik.values.minArea} onChange={formik.handleChange} type="number" name="minArea" id="minArea" placeholder="100" />
                                <p>m</p>
                            </div>
                        </div>

                        <div className={styles.filters__left_button_popup_input}>
                            <p>maximum</p>
                            <div>
                                <input value={formik.values.maxArea} onChange={formik.handleChange} type="number" name="maxArea" id="maxArea" placeholder="3000" />
                                <p>m</p>
                            </div>
                        </div>
                        <button type="submit">Apply</button>
                    </div>
                </div>

                <div
                    className={`${styles.filters__left_button} 
                    ${filters.roofType ? styles.activeButton : ""}`}
                >
                    <p>
                        Roof
                        {filters.roofType
                            ? `: ${filters.roofType}`
                            : ""}
                    </p>
                    {!filters.roofType ? (
                        <Triangle />
                    ) : (
                        <div className={ styles.filters__left_button_close}
                            onClick={() => changeFilter('roofType', null)}
                        >
                            <Cross />
                        </div>
                    )}

                    <div className={styles.filters__left_button_popup}>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Flat')}
                        >
                            Flat
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Pitched')}
                        >
                            Pitched
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Mixed')}
                        >
                            Mixed
                        </p>
                    </div>
                </div>

                <div
                    className={`${styles.filters__left_button} 
                    ${filters.cost ? styles.activeButton : ""}`}
                >
                    <p>
                        Cost
                        {filters.cost
                            ? `: ${filters.cost[0]} - ${filters.cost[1]}$`
                            : ""}
                    </p>
                    {!filters.cost ? (
                        <Triangle />
                    ) : (
                        <div className={styles.filters__left_button_close}
                            onClick={() => changeFilter('cost', null)}
                        >
                            <Cross />
                        </div>
                    )}
                    <div className={styles.filters__left_button_popup}>
                        <div className={styles.filters__left_button_popup_input }>
                            <p>minimum</p>
                            <div>
                                <input type="number" name="" id="" placeholder="10" />
                                <p>{currencyData[currency]}</p>
                            </div>
                        </div>

                        <div className={styles.filters__left_button_popup_input } >
                            <p>maximum</p>
                            <div>
                                <input type="number" name="" id="" placeholder="1000" />
                                <p>{currencyData[currency]}</p>
                            </div>
                        </div>
                        <button type="submit">Apply</button>
                    </div>
                </div>
                
            </form>
            <div className={styles.filters__right}>
                <p onClick={() => dispatch(resetFilters())}>
                    Reset filters
                </p>
                <div>Filter</div>
            </div>
        </div>
    )
}

export default ProjectFilterSection;