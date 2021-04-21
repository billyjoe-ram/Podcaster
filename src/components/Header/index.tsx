import styles from "./styles.module.scss";

export function Header() {
    const currentDate = new Date();    
    const currentYear = currentDate.getFullYear().toString();

    let currentDay = new Date().toDateString();
    
    currentDay = currentDay.split(currentYear).shift();

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcaster"/>

            <p>Listen to podcasts, always</p>

            <span>{currentDay}</span>
        </header>
    )
}