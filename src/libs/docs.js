import expressDocsSwagger from 'express-jsdoc-swagger';

function Initdocs(app){
    const options = {
        info: {
            version: '1.0.0',
            title: 'API Backend Express',
            description: 'API documentation for Backend Express',
        },
        baseDir: process.cwd(),
        filesPattern: './src/controllers/*.js',
        swaggerUIPath: '/api-docs',
        exposeSwaggerUI: true,
        exposeApiDocs: false,
        apiDocsPath: '/api-docs.json',
        multiple: true,
    };
    expressDocsSwagger(app)(options);
}

export default Initdocs