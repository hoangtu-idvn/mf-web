import Image from "next/image";
import Link  from "next/link";
export const AppIcon = ({direction = 'left', app  = {title: 'App',code: 'app', icon: null}}) => {
    return (
        <>
           
            <div className={`app ${direction} my-3 my-lg-5`}>
            <Link href={app.code}>
                <div className={`app-wrapper ${direction} position-relative`}>
                    <div className={`app-info ${app.code}`}>
                        <div className="app-title">{app.title}</div>
                    </div>
                    <div className={`${direction} app-icon`}>
                        <div className="icon-wrapper">
                            <div className="icon-image">
                                <Image src={app.icon || '/logo.jpg'} width={51} height={51} alt={app.icon || 'image application'}/>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
           
            </div> 
            </>
            );
            }