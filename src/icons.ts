// Test :
// const testLicenses = ['TA-DI-R1', 'TA-DI-CU-A-R', 'TA-DI-E-CO-PH', 'TA-DI-CU-A', '', 'CNTR-DI-CU-A-R', 'TA-CC0', 'TA-CC-BY', 'TA-CC-BY-SA', 'CC-BY-SA']

import ERC1155Icon from "./svg/erc1155-icon"
import ERC721Icon from "./svg/erc721-icon"
import NoLicenseIcon from "./svg/no-license-icon"
import PublicDomainIcon from "./svg/public-domain-icon"
import AttributionIcon from "./svg/attribution-icon"
import ShareAlikeIcon from "./svg/share-alike-icon"

type Icon = { name: string, tag?: string, description: string }

export const iconSet: Icon[] = [
    {
        name: 'Digital',
        tag: 'DI',
        description: 'This NFT is digital. The NFT holder can personaly use the artwork and do what he can usually do with a NFT. This include the Right to use the NFT Artwork in any smartcontract verifying the proof of ownership.'
    },
    {
        name: 'Commercial',
        tag: 'CU',
        description: 'This NFT artwork can be commercially exploited.'
    },
    {
        name: 'Adaptable',
        tag: 'A',
        description: 'This NFT artwork can be adapted.'
    },
    {
        name: 'All IP Right',
        tag: 'DI-CU-A',
        description: 'This NFT comes with all the intellectual property rights. The author offers the right to commercialy exploit and to adapt the artwork in order to create other NFT artwork or to commercially exploit the adaptation.'
    },
    {
        name: 'Exclusive',
        tag: 'E',
        description: 'The piece of work is exclusively represented by this NFT.'
    },
    {
        name: 'Physical',
        tag: 'PH',
        description: 'This NFT is a physical asset.'
    },
    {
        name: 'Reproductible Once',
        tag: 'R1',
        description: 'This NFT can be reproduced on any medium, only once.'
    },
    {
        name: 'Commission',
        tag: 'CO',
        description: 'This NFT has a commision. Every time the artwork of the NFT generates revenue, a small amount of the NFT price is sent to the owner.'
    },
    {
        name: 'Royalties',
        tag: 'R',
        description: 'This NFT has royalties. Every time this NFT is sold, a small amount of the price is sent to the author.'
    },
    {
        name: 'Metaverse',
        tag: 'M',
        description: 'The artwork of this NFT can be used in any metaverse. It can be imported and exported at will, in any immersive world.'
    },
    {
        name: 'ERC721',
        description: 'Single - ERC 721',
    },
    {
        name: 'ERC1155',
        tag: 'Multiple - ERC 1155',
        description: '',
    },
    {
        name: 'No License',
        description: 'This NFT has no registered license.',
    },
    {
        name: 'CC0',
        description: 'This NFT is under Creative Common license - CC0: Public domain.',
    },
    {
        name: 'CCBY',
        description: 'This NFT is under Creative Common license - CCBY: Attribution.',
    },
    {
        name: 'CCBYSA',
        description: 'This NFT is under Creative Common license - CCBYSA: Share Alike.',
    },
]

const iconsSrc = {
    'DI': '0b6a68d7-7d8c-4638-b002-4b27722b6000',
    'CU': '0d75b1cc-344c-4997-e1a1-31566dcd3e00',
    'A': 'cce19074-8524-44b3-35e8-38f036605700',
    'DI-CU-A': 'ae4033a3-aec9-4052-5aa5-ffedfd3ea100',
    'E': 'bd674b2b-75f8-4b27-8990-6941a7acdc00',
    'PH': '7a55c0f7-4064-4e3b-1a27-390a7106a200',
    'R1': 'caed924a-bf49-401b-25c6-e480c58db900',
    'CO': '72413a43-50a3-414a-e834-685b895a3700',
    'R': '6964a858-5a54-4435-9166-9c29db14f800',
    'M': '',
}

export function getIcons(license: string, tokenStandard?: 'ERC721'|'ERC1155') {
    const icons: Icon[] = []
    let warning = ''

    const prefix = license.split('-')[0]
    let suffix

    if (prefix === 'TA') {
        suffix = license.substring(3)
    } else if (prefix === 'CNTR') {
        suffix = license.substring(5)
    } else {
        suffix = license
    }

    if (tokenStandard) icons.push(iconSet.find(icon => icon.name === tokenStandard))

    if (!license || license.length === 0) {
        icons.push(iconSet.find(icon => icon.name === 'No License'))
        warning = 'WARNING! NO LICENSE FOUND'
    } else {
        if (prefix === 'CNTR') warning = 'WARNING! CENTRALIZED LICENSE STORAGE'

        if (suffix === 'CC0') icons.push(iconSet.find(icon => icon.name === 'CC0'))
        if (suffix === 'CC-BY') icons.push(iconSet.find(icon => icon.name === 'CCBY'))
        if (suffix === 'CC-BY-SA') icons.push(iconSet.find(icon => icon.name === 'CCBYSA'))

        icons.push(...suffix.split('-').map(tag => iconSet.find(icon => icon.tag === tag)))
    }

    return { icons: icons.map(icon => ({ ...icon,
        element: getIconElement(icon),
     })), warning }
}

export function getIconElement(icon: Icon): string {
    const props = `style="width: 50px; height: 50px;"`

    if (icon.name === 'ERC721')
        return ERC721Icon({color: 'light', props})
    if (icon.name === 'ERC1155')
        return ERC1155Icon({color: 'light', props})
    if (icon.name === 'No License')
        return NoLicenseIcon({color: 'dark', props})
    if (icon.name === 'CC0')
        return PublicDomainIcon({color: 'dark', props})
    if (icon.name === 'CCBY')
        return AttributionIcon({color: 'dark', props})
    if (icon.name === 'CCBYSA')
        return ShareAlikeIcon({color: 'dark', props})

    if (!(icon.tag in iconsSrc)) throw 'TokenArt.lib: Icon not found.'

    return `<div style="background-color: rgb(11 22 60); border-radius: 50%; display: inline-block;">
        <img
          src="https://imagedelivery.net/To-SpZbUkwzPkr4jjWBZ2A/${iconsSrc[icon.tag]}/min"
          alt="${icon.name}"
          ${props}
        />
    </div>`
}
