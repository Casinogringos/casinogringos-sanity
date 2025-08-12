module.exports = {
    forbidden: [
        { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    ],
    options: {
        tsConfig: { fileName: 'tsconfig.json' },
        exclude: ['node_modules', '\\.next', 'out', 'dist']
    }
};
