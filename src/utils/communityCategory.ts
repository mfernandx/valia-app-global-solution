export const COMMUNITY_CATEGORIES = [
    { value: 1, label: 'Relato' },
    { value: 2, label: 'Dúvida' },
    { value: 3, label: 'Dica' },
    { value: 4, label: 'Discussão' },
    { value: 5, label: 'Outro' },
];

export function getCommunityCategoryLabel(category: number | string): string {

    const numericCategory = typeof category === 'number' ? category : Number(category);

    if (!Number.isNaN(numericCategory)) {
        return COMMUNITY_CATEGORIES.find(item => item.value === numericCategory)?.label ?? 'Outro';
    }

    const normalizedCategory = String(category).toLowerCase();

    const categoryNames: Record<string, string> = {
        relato: 'Relato',
        duvida: 'Dúvida',
        dica: 'Dica',
        discussao: 'Discussão',
        outro: 'Outro',
    };

    return categoryNames[normalizedCategory] ?? 'Outro';
}