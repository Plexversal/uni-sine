import { useEffect, useState } from 'react';
import styles from '../../styles/OfferBanner.module.css';

export default function OfferBanner({code, expires, user, isLoading}) {
    const [closed, setClosed] = useState(true);
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        if (!isLoading) {
            const closedBanner = localStorage.getItem('closedBanner') === 'true';
            if (closedBanner) {
                setClosed(true);
            } else if (user && user.app_metadata && user.app_metadata.is_premium) {
                setClosed(true);
            } else {
                setClosed(false);
            }
        }
    }, [user, isLoading]);

    useEffect(() => {

        async function getData() {
            if(banner) return;
            try {
                const request = await fetch('/api/db/getOfferBanner')
                const response = await request.json();
                setBanner(response)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        
    }, [])
    
      

    const handleClose = () => {
        localStorage.setItem('closedBanner', 'true');
        setClosed(true);
    };

    return (
        <>
            {
                !closed && !isLoading && banner && banner.active == true && (
                    <div className={styles['offer-banner']}>
                        Use code <strong>{banner?.code}</strong> for 10% off at checkout. Offer expires <strong>{banner?.expires}</strong>
                        <button title='close offer' onClick={handleClose}>&times;</button>
                    </div>
                )
            }
        </>
    );
}
