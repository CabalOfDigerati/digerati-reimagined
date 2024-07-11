/**
 * Mouse Trail.
 * 
 * @author <cabal@digerati.design>
 */
export const mouseTrail = () => {
    const fxContainer = document.querySelector('[dd-mouse-trail="fx-container"]');
    if (fxContainer) {
        for (let i = 0; i < 500; i++) {
            const fx = document.createElement('i');
            fxContainer.appendChild(fx);
        }
    }
};


