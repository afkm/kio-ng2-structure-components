import { KioContentModel, KioFragmentModel } from 'kio-ng2'
import { mock } from 'kio-ng2-component-routing'
const { mockFragment, mockContentFromString, mockContent, cuid } = mock

const mockLandscapeImageSrc =   new KioContentModel ( {
  cuid: 'cj1nej1wd000p3k5ws9854bxr',
  locale: 'en_US',
  type: 'src',
  headers: {
    color: 'red' ,
    ratio: 764/569,
    mimeType: 'image/jpeg'
  }
} )

const mockPortraitImageSrc = new KioContentModel ( {
  cuid: 'cj1rl47ap00053k5wd4mp0xjg' ,
  locale: 'en_US' ,
  type: 'src' ,
  headers: {
    color: 'blue' ,
    ratio: 685/999,
    mimeType: 'image/jpeg'
  }
})

const mockAudioSource = new KioContentModel ( {
  cuid: 'cj3ld2gso00003i5wa6b2it04',
  locale: 'de_DE',
  type: 'src'
} )

const VIMEO_SRC = new KioContentModel ( {
  cuid: 'cj1ovp2vw00003k5pgbu7k52w',
  type: 'src',
  locale: 'en_US'
})

export const TestData = [

  {
    componentName: 'MediaSingleImage' ,
    data: [
      {
        name: 'portrait' ,
        data: new KioFragmentModel ( {
          cuid: '2489u92hiuh42uh4',
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' )
          ]
        } )
      },
      {
        name: 'landscape' ,
        data: new KioFragmentModel ( {
          cuid: '2489u92hiuh42uh4',
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' )
          ]
        } )
      }
    ]
  },
  {
    componentName: 'SingleColumn' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'TwoColumns' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'TwoColumnsAndImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      // modifiers:  ['text-right'],
      children: [
          mockContent ( 'txt' ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  ['image'],
            children: [
              // mockPortraitImageSrc,
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
          }),
        ]
    } )
  },
  {
    componentName: 'TextAndAudio' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockContent ( 'txt' ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  ['audio'],
            children: [
              mockContent ( 'txt' ),
              mockLandscapeImageSrc // should be audio-src
            ]
          }),
        ]
    } )
  },
  {
    componentName: 'BigPic' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['big-pic'],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockLandscapeImageSrc,
          mockLandscapeImageSrc,
          mockLandscapeImageSrc
        ]
    } )
  },
  {
    componentName: 'LabeledImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockLandscapeImageSrc,
          // mockPortraitImageSrc,
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'LabeledImageWithDescription' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockLandscapeImageSrc,
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'ImageGallery',
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockPortraitImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } )
        ]
    } )
  },
  {
    componentName: 'ImageGalleryWide',
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              // mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockPortraitImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              // mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              // mockContent ( 'txt' )
            ]
        } )
        ]
    } )
  },
  {
    componentName: 'MediaVideo' ,
    data: mockFragment ( [VIMEO_SRC, 'txt'], ['video'] )
  },
  {
    componentName: 'LabeledImageWithMorphing' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['morph'],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockPortraitImageSrc,
          mockPortraitImageSrc,
          mockPortraitImageSrc
        ]
    } )
  },
  {
    componentName: 'Intro' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockContent ( 'txt' ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  [],
            children: [
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
          })
        ]
    } )
  },
  {
    componentName: 'FormattedText',
    data: new KioContentModel({
      type: 'txt',
      cuid: 'cj3lewufx00213i5ycgmevw9h'
    })
  },
  {
    componentName: 'Outro' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['outro'],
      children: [
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'PanelChapter' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['outro'],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  [],
            children: [
                mockPortraitImageSrc,
                mockContent ( 'txt' ),
                mockContent ( 'txt' )
              ]
          } ),
          mockContent ( 'txt' ),
        ]
    } )
  },
  {
    componentName: 'Hint' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['hint'],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  [],
            children: [
                mockLandscapeImageSrc,
                // mockPortraitImageSrc,
                mockContent ( 'txt' ),
                mockContent ( 'txt' )
              ]
          } ),
          new KioFragmentModel ( {
            cuid: cuid () ,
            modifiers:  [],
            children: [
                mockLandscapeImageSrc,
                // mockPortraitImageSrc,
                mockContent ( 'txt' ),
                mockContent ( 'txt' )
              ]
          } ),
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
        ]
    } )
  },
  {
    componentName: 'Nba' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['nba'],
      children: [
          mockContent ( 'txt' ),
          mockLandscapeImageSrc,
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'NbaGroup' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['nba'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
              mockContent ( 'txt' ),
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
              mockContent ( 'txt' ),
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
              mockContent ( 'txt' ),
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
              mockContent ( 'txt' ),
              mockLandscapeImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } )
        ]
    } )
  },
  {
    componentName: 'Social' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['social'],
      children: [
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'Share' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['share'],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },

  {
    componentName: 'Quote' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
          mockContent ( 'txt' ),
          mockContent ( 'txt' ),
          mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'ImageMagnifier' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['image','magnify', 'align-right', 'x-20', 'y-70'],
      children: [
          mockLandscapeImageSrc,
          mockPortraitImageSrc,
          mockContent ( 'txt' )
        ]
    } )
  },

  {
    componentName: 'Metabox' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox'],
      children: [
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
        ]
    } )
  },

  {
    componentName: 'MetaboxCore' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox','core'],
      children: [
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
        ]
    } )
  },

  {
    componentName: 'MetaImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox'],
      children: [
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
        ]
    } )
  },
  {
    componentName: 'AudioPlayer' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['audio'],
      children: [
        mockContent ( 'txt' ),
        mockAudioSource // this has to be audio src
        ]
    } )
  },

  {
    componentName: 'ComparisonSlider' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['comparison'],
      children: [
        mockLandscapeImageSrc,
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
        ]
    } )
  },

  {
    componentName: 'BgrChapter6' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['morph'],
          children: [
              mockContent ( 'txt' ),
              mockContent ( 'txt' ),
              mockPortraitImageSrc,
              mockPortraitImageSrc,
              mockPortraitImageSrc
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox','core'],
          children: [
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
            ]
        } ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
              mockPortraitImageSrc,
              // mockPortraitImageSrc,
              mockContent ( 'txt' ),
              mockContent ( 'txt' )
            ]
        } )
      ]
    } )
  },
  {
    componentName: 'MetaImages' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
            ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
            ]
        } )
        ]
    } )
  },
  {
    componentName: 'Image',
    data: new KioContentModel ({
      type: 'src',
      cuid: 'cj3le7adu000b3i5w932wpbzy',
      locale: 'de_DE'
    })
  }
]
