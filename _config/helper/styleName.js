const fileMatch = /\.temp/;

module.exports = function({ types: t }) {
    return {
        visitor: {
            JSXElement: {
                enter(path, state) {
                    let hasClassName = false,
                        hasStyleName = false,
                        css = null;
                    path.node.openingElement.attributes.forEach(element => {
                        if (element.name.name === 'className') {
                            hasClassName = true;
                            css = element;
                        }
                    });

                    if (
                        hasClassName &&
                        state.file.opts.filename.match(fileMatch)
                    ) {
                        css.name.name = 'styleName';
                    }
                }
            },
            Program: {
                exit(path) {
                    let a = '';
                }
            }
        }
    };
};
