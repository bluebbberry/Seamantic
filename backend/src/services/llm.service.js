import ollama from 'ollama';

export class LlmService {
    static llmService = new LlmService();

    constructor() {
        this.ollamaIsAvailable = false;
        this.calculateWhetherOllamaAvailable();
    }

    async toSparqlQuery(nlQuestion) {
        if (this.ollamaIsAvailable) {
            const ontologyMapping = this.toOntologyMapping(nlQuestion);
            const prompt = "With this ontology mapping: " + ontologyMapping
                + " Create me a SPARQL-query for the following question: " + nlQuestion;
            const answer = await this.sendData(prompt);
            return prompt;
        } else {
            return null;
        }
    }

    toOntologyMapping(question) {
        return "Albert Einstein: Albert_Einstein, birth date: birthDate";
    }

    async calculateWhetherOllamaAvailable() {
        try {
            await ollama.list();
            console.error("Ollama service is running.");
            this.ollamaIsAvailable = true;
        } catch (e) {
            console.error("Ollama service not available.");
            this.ollamaIsAvailable = false;
        }
    }

    async sendData(prompt) {
        try {
            const response = await ollama.chat({
                model: 'llama3.2',
                messages: [{ role: 'user', content: prompt },],
            })
            console.log(response.message.content)
            return response.message.content;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
