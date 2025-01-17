'use client'
import {useEffect} from "react";
import {AppIcon} from "@/app/(master)/_components/AppIcon";
import Image from "next/image";


export default function MasterPage(){


    useEffect(() => {

    }, []);


    return (
        <div className={"bg-master"}>
            <div className="container apps-w d-flex  mx-auto ">
                <div className="apps">
                   <AppIcon app={{code: "system", title: "System"}}/>
                   <AppIcon app={{code: "system", title: "System"}}/>
                   <AppIcon app={{code: "system", title: "System"}}/>
                   <AppIcon app={{code: "system", title: "System"}}/>
                   </div>
                <div className="master-logo">
                    <div className="logo-wrapper">
                        <Image src={"/logo-master.png"} width={340} height={340} alt={"logo-master"}/>
                    </div>
                </div>
                <div className="apps">
                   <AppIcon app={{code: "system", title: "System", icon: "/icon/organization.png"}} direction={"right"}/>
                   <AppIcon app={{code: "system", title: "System"}} direction={"right"}/>
                   <AppIcon app={{code: "system", title: "System"}} direction={"right"}/>
                   <AppIcon app={{code: "system", title: "System"}} direction={"right"}/>
                   </div>
            </div>
        </div>
    );
}