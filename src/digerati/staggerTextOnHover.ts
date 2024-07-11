/**
 * Current Year.
 * 
 * @author <cabal@digerati.design>
 */
export const staggerTextOnHover = () => {
    let splitText;
    const runSplit = () => {
        splitText = new SplitType('[dd-stagger-text="link"]', {
            types: 'words, chars'
        });
    }
    runSplit();
    const staggerLinks = document.querySelectorAll('[dd-stagger-text="link"]');
    staggerLinks.forEach((link) => {
        const letters = link.querySelectorAll('[dd-stagger-text="letters"] .char');
        link.addEventListener('mouseenter', function () {
            gsap.to(letters, {
                yPercent: -100,
                duration: 0.5,
                ease: 'power4.out',
                stagger: {
                    each: 0.025,
                    from: 'start'
                },
                overwrite: true
            });
        });
        link.addEventListener('mouseleave', function () {
            gsap.to(letters, {
                yPercent: 0,
                duration: 0.5,
                ease: 'power4.out',
                stagger: {
                    each: 0.025
                }
            });
        });
    });
    /* START Replace jQuery */
    let windowWidth = $(window).innerWidth();
    window.addEventListener('resize', function () {
        if (windowWidth !== $(window).innerWidth()) {
            windowWidth = $(window).innerWidth();
            splitText.revert();
            runSplit();
        }
    });
    /* END Replace jQuery */
};
