from django.shortcuts import render

'''
    Home screen view welcoming the visitor
'''


def home_screen_view(request):
    return render(request, "base.html", {})
