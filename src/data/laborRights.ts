import type { LaborRightCategory } from '../models/laborRights';

export const laborRights: LaborRightCategory[] = [
    {
        id: 'jornada',
        title: 'Jornada de trabalho',
        description: 'Horas extras, intervalos e períodos de descanso.',
        icon: 'time-outline',
        sections: [
            {
                title: 'Jornada regular',
                content: 'Como regra geral, a jornada de trabalho é limitada a 8 horas diárias e 44 horas semanais, conforme a Constituição Federal. Existem regimes especiais e possibilidades de compensação de horários.'
            },
            {
                title: 'Horas extras',
                content: 'O trabalho extraordinário deve receber adicional de, no mínimo, 50% sobre a hora normal, ressalvadas as regras aplicáveis aos diferentes regimes e acordos.'
            },
            {
                title: 'Intervalos',
                content: 'Em regra, jornadas superiores a 6 horas exigem intervalo intrajornada de pelo menos 1 hora. Para jornadas superiores a 4 horas e de até 6 horas, o intervalo é de 15 minutos.'
            }
        ],
        legalReferences: ['Constituição Federal, art. 7º', 'CLT, arts. 58, 59 e 71']
    },
    {
        id: 'remuneracao',
        title: 'Salário e benefícios',
        description: 'Pagamento, férias, 13º salário e FGTS.',
        icon: 'wallet-outline',
        sections: [
            {
                title: 'Pagamento do salário',
                content: 'Para empregados mensalistas, o pagamento deve ocorrer, em regra, até o quinto dia útil do mês seguinte ao trabalhado.'
            },
            {
                title: 'Décimo terceiro salário',
                content: 'O 13º salário é um direito dos empregados abrangidos pela legislação aplicável, sendo calculado proporcionalmente aos meses trabalhados no ano.'
            },
            {
                title: 'Férias remuneradas',
                content: 'Em regra, após 12 meses de trabalho, o empregado adquire direito a férias, com remuneração acrescida de pelo menos um terço.'
            }
        ],
        legalReferences: ['Constituição Federal, art. 7º', 'CLT, arts. 129 e seguintes', 'Lei nº 4.090/1962']
    },
    {
        id: 'seguranca',
        title: 'Saúde e segurança',
        description: 'Condições seguras e prevenção de riscos.',
        icon: 'shield-checkmark-outline',
        sections: [
            {
                title: 'Ambiente de trabalho seguro',
                content: 'O empregador deve cumprir as normas de segurança e medicina do trabalho, adotando medidas para prevenir acidentes e doenças ocupacionais.'
            },
            {
                title: 'Equipamentos de proteção',
                content: 'Quando exigido pelas condições de trabalho, o empregador deve fornecer gratuitamente equipamentos de proteção individual adequados aos riscos.'
            }
        ],
        legalReferences: ['CLT, arts. 157 e 166', 'Normas Regulamentadoras do Ministério do Trabalho e Emprego']
    },
    {
        id: 'contrato',
        title: 'Contrato e rescisão',
        description: 'Admissão, vínculos e desligamento.',
        icon: 'document-text-outline',
        sections: [
            {
                title: 'Registro do vínculo',
                content: 'O empregador deve registrar as informações obrigatórias relativas à contratação do empregado, conforme a legislação trabalhista.'
            },
            {
                title: 'Rescisão contratual',
                content: 'Os direitos devidos no encerramento do contrato variam conforme a modalidade de desligamento, como pedido de demissão, dispensa sem justa causa ou justa causa.'
            }
        ],
        legalReferences: ['CLT, arts. 29, 477 e 482']
    },
    {
        id: 'respeito',
        title: 'Respeito no trabalho',
        description: 'Assédio, discriminação e dignidade.',
        icon: 'people-outline',
        sections: [
            {
                title: 'Assédio moral',
                content: 'Condutas abusivas que humilham ou constrangem trabalhadores podem caracterizar assédio moral, dependendo das circunstâncias e da avaliação do caso.'
            },
            {
                title: 'Discriminação',
                content: 'A legislação brasileira proíbe práticas discriminatórias no acesso e na manutenção do emprego por motivos protegidos em lei.'
            },
            {
                title: 'Busca por orientação',
                content: 'É possível procurar orientação jurídica, sindicatos, órgãos de fiscalização e canais oficiais de denúncia, conforme a situação.'
            }
        ],
        legalReferences: ['Constituição Federal, arts. 1º, 3º e 5º', 'Lei nº 9.029/1995']
    },
    {
        id: 'ajuda',
        title: 'Onde buscar ajuda',
        description: 'Órgãos públicos e canais de orientação.',
        icon: 'help-circle-outline',
        sections: [
            {
                title: 'Ministério do Trabalho e Emprego',
                content: 'Disponibiliza informações sobre legislação trabalhista, fiscalização e canais de atendimento.'
            },
            {
                title: 'Ministério Público do Trabalho',
                content: 'Atua na defesa de direitos coletivos dos trabalhadores e recebe denúncias relacionadas a irregularidades trabalhistas de sua competência.'
            },
            {
                title: 'Justiça do Trabalho',
                content: 'É responsável pelo julgamento de conflitos decorrentes das relações de trabalho, nos termos da Constituição Federal.'
            }
        ],
        legalReferences: ['gov.br/trabalho-e-emprego', 'mpt.mp.br', 'tst.jus.br']
    }
];
