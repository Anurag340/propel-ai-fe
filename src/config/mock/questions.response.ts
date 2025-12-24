export const MOCK_HOT_QUESTIONS = [
    "How can Propel help with my search experience?",
    "What customizable components are available?",
    "Show me integration options for Webflow.",
    "Can I use my own custom CSS classes?",
    "What are the pricing tiers for the Enterprise plan?"
];

export const MOCK_RELATED_QUESTIONS_HTML = `
<div class="question-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);">
    <svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span style="font-size: 0.875rem;">How do I configure the search bar?</span>
</div>
<div class="question-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);">
    <svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span style="font-size: 0.875rem;">Is there a dark mode option available?</span>
</div>
<div class="question-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);">
    <svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span style="font-size: 0.875rem;">Can I customize the response window layout?</span>
</div>
<div class="question-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);">
    <svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span style="font-size: 0.875rem;">Where can I find the API documentation?</span>
</div>
`;

export const MOCK_RELATED_QUESTIONS = [
    { question: "How does the search algorithm work?" },
    { question: "Can I customize the search results?" },
    { question: "What languages are supported?" }
];
