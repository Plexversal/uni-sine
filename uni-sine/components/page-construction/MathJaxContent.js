import { useEffect, memo } from 'react';
import debounce from 'lodash/debounce';

function MathJaxContent({ content }) {
    


    useEffect(() => {
        
            if (window.MathJax && window.MathJax.typeset) {
                window.MathJax.typeset();
            }
      
    }, [content]);

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default memo(MathJaxContent);
