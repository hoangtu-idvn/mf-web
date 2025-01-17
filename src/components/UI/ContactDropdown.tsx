import Image from "next/image";
import {config} from "@/config";
import t from "@/locales";

export default function ContactDropdown(){
    return (
        <>
            <div className="dropdown">
                <a
                    href={`tel:${config.company.supportPhone}`}
                    className="btn btn-primary dropdown-toggle d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <Image src="/images/bot.svg" width={24} height={24} alt=""></Image>
                    <span className='ms-2'>{t.support247}</span>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item"
                           href={`tel:${config.company.supportPhone}`}>
                            {config.company.supportPhone}
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
