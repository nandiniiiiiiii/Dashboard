import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

function Horizontalscrole({ children }) {
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ target:ref });
    const x = useTransform(scrollXProgress,[0,1],["0%","-55%"])

    return (
        <div ref={ref}>
            <div>
                <motion.div style={{ x, width: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10px', overflow: 'hidden'}}>
                    {children}
                </motion.div>
            </div>
        </div>
    )
}

export default Horizontalscrole
