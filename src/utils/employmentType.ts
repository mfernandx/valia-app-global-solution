export const employmentTypeOptions = [
    { label: 'CLT', value: 1 },
    { label: 'Estágio', value: 2 },
    { label: 'Aprendizagem', value: 3 },
    { label: 'Autônomo', value: 4 },
    { label: 'Temporário', value: 5 },
    { label: 'Outro', value: 6 },
];

export function getEmploymentTypeLabel(value: number | string): string {
    
    const numericValue = Number(value);
    const option = employmentTypeOptions.find(item => item.value === numericValue);

    if (option) return option.label;

    const labels: Record<string, string> = {
        CLT: 'CLT',
        Estagio: 'Estágio',
        Aprendizagem: 'Aprendizagem',
        Autonomo: 'Autônomo',
        Temporario: 'Temporário',
        Outro: 'Outro',
    };

    return labels[String(value)] ?? 'Não informado';
}
