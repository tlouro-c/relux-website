import React from 'react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { PlayIcon, Eye3DIcon } from 'lucide-react'

interface PropertyVirtualTourProps {
  virtualTourUrl?: string | null
  videoUrl?: string | null
}

export default function PropertyVirtualTour({ virtualTourUrl, videoUrl }: PropertyVirtualTourProps) {
  if (!virtualTourUrl && !videoUrl) {
    return null
  }

  return (
    <ElementRevealFromBottom delay={0.4}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Tour Virtual & Vídeo</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Virtual Tour */}
          {virtualTourUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye3DIcon className="size-5 text-accent" strokeWidth={1.5} />
                <h4 className="font-medium">Tour Virtual 360°</h4>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={virtualTourUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Tour Virtual do Imóvel"
                />
              </div>
              <a
                href={virtualTourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors duration-200"
              >
                <Eye3DIcon className="size-4" strokeWidth={1.5} />
                Abrir em ecrã completo
              </a>
            </div>
          )}

          {/* Video */}
          {videoUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PlayIcon className="size-5 text-accent" strokeWidth={1.5} />
                <h4 className="font-medium">Vídeo do Imóvel</h4>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                {/* Check if it's a YouTube or Vimeo URL and embed accordingly */}
                {(videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) ? (
                  <iframe
                    src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Vídeo do Imóvel"
                  />
                ) : videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Vídeo do Imóvel"
                  />
                ) : (
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  />
                )}
              </div>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors duration-200"
              >
                <PlayIcon className="size-4" strokeWidth={1.5} />
                Ver vídeo original
              </a>
            </div>
          )}
        </div>
      </div>
    </ElementRevealFromBottom>
  )
}