import { useState } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar'

function NavBar({ children }) {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <div>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <SideBar isSidebar={isSidebar} />
                        <main className='content'>
                            <TopBar setIsSidebar={setIsSidebar} />
                        </main>
                    </div>
                </ThemeProvider>
                <div style={{
                    marginLeft: '260px',
                    height: 'auto',
                    marginRight: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '30px',
                }}>
                    {children}
                </div>
            </ColorModeContext.Provider>
        </div>
    )
}

export default NavBar
