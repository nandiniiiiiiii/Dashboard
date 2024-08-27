export function fetchAllData() {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        resolve({ data });
        console.log("done-1")
    })
}
