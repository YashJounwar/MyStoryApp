
function useActiveStyle() {
    
    const activeStyle = (({ isActive }) => {
        return {
            color: isActive ? "rgb(237, 28, 36)" : "black",
            fontSize: isActive ? "larger" : "large",
            textDecoration: isActive ? 'none' : 'none',
        }
    });

    return [activeStyle];
}

export default useActiveStyle
