export class LlmService {
    static llmService = new LlmService();

    toSparqlQuery(nlQuestion) {
        const ontologyMapping = this.toOntologyMapping(nlQuestion);
        const prompt = "With this ontology mapping: " + ontologyMapping
            + " Create me a SPARQL-query for the following question: " + nlQuestion;
        // TODO: answer with ollama
        return prompt;
    }

    toOntologyMapping(question) {
        return "Albert Einstein: Albert_Einstein, birth date: birthDate";
    }
}
