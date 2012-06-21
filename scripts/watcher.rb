#!/usr/bin/env ruby
#  lazy-loop until a file changes, then run a command
#
def syntax()
  puts 'syntax: trigger "command...args" files...'
  exit 1
end

syntax()  if 0 == ARGV.size
command = ARGV.shift
$fileTimes = {}

def anyFileChanged()
  anyChanged = false
  ARGV.each do |fn|
    begin
      mod = File.mtime(fn)
      anyChanged = true  if $fileTimes[fn] != mod
      $fileTimes[fn] = mod
    rescue
      puts $!
      sleep 2
    end
  end
  return anyChanged
end

def growl_it(what)
  g_bin = "/usr/local/bin/growlnotify"
  imgs  = { 'fail' => '/Users/drio/Dropbox/Pictures/fail.png',
            'pass' => '/Users/drio/Dropbox/Pictures/pass.png' }
  msgs  = { 'fail' => 'Tests Failed',
            'pass' => 'Tests Passed' }
  g_cmd = "#{g_bin} -n X --image #{imgs[what]} -m '#{msgs[what]}' drio_testing"

  system(g_cmd)
end

anyFileChanged()

while true
  sleep 1
  if anyFileChanged()
    got         = system(command)
    #pass_or_not = got ? 'pass' : 'fail'
    #growl_it(pass_or_not)
  end
  printf("."); STDOUT.flush
end
