import * as monaco from 'monaco-editor';
import { listen } from 'vscode-ws-jsonrpc';
import {
    MonacoLanguageClient, CloseAction, ErrorAction,
    MonacoServices, createConnection
} from 'monaco-languageclient';
const ReconnectingWebSocket = require('reconnecting-websocket');

var connected = false;

export function getCppReady(editor, BASE_DIR, url) {

    monaco.languages.register({
        id: 'cpp',
        extensions: ['.cpp', '.c', '.h', '.hpp'],
        aliases: ['cpp', 'CPP', 'c', 'C'],
    });

    monaco.languages.registerCompletionItemProvider('cpp', {
        provideCompletionItems: function(model, position) {
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };
            return {
                suggestions: createDependencyProposals(range)
            };
        }
    });

    MonacoServices.install(editor, {
        rootUri: BASE_DIR
    });

    console.log("using Web Socket URL = ", url);
    if (!connected) {
        const webSocket = createWebSocket(url);
        listen({
            webSocket,
            onConnection: connection => {
                console.log("onConnection!")
                connected = true;
                // create and start the language client
                const languageClient = createLanguageClient(connection);
                const disposable = languageClient.start();
                connection.onClose(() => disposable.dispose());
            }
        });
    }
}


function createWebSocket(url) {
    const socketOptions = {
        maxReconnectionDelay: 10000,
        minReconnectionDelay: 1000,
        reconnectionDelayGrowFactor: 1.3,
        connectionTimeout: 10000,
        maxRetries: Infinity,
        debug: false
    };
    return new ReconnectingWebSocket(url, [], socketOptions);
}

function createLanguageClient(connection) {
    return new MonacoLanguageClient({
        name: "Sample Language Client",
        clientOptions: {
            // use a language id as a document selector        
            documentSelector: ['cpp'],
            // disable the default error handler            
            errorHandler: {
                error: () => ErrorAction.Continue,
                closed: () => CloseAction.DoNotRestart
            },
        },
        // create a language client connection from the JSON RPC connection on demand
        connectionProvider: {
            get: (errorHandler, closeHandler) => {
                return Promise.resolve(createConnection(connection, errorHandler, closeHandler));
            }
        }
    });
}


function createDependencyProposals(range) {
    return [
        {
            label: 'main',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "int main(int argc, char *argv[])",
            insertText: 'int main(int argc, char *argv[]) {\n\t${1}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'cin',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "cin",
            insertText: 'std::cin >> ${1:value};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'cout',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "cout with endl",
            insertText: 'std::cout << ${1:value} << std::endl;',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'forloop',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "for loop with index++",
            insertText: 'for (auto ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${3}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'foreach',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "for-iter loop",
            insertText: 'for (auto &${1:element}: ${2:container}) {\n\t${3}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
    ];
}